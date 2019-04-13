import React, { useState, useEffect, useMemo } from 'react';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'
import _pull from 'lodash/pull'
import _some from 'lodash/some'
import _mapKeys from 'lodash/mapKeys'

import axios from 'axios'
import { withAlert } from 'react-alert'

import { BASE_URL, PRODUCT, POST, IMPORT } from '../../../../config/routes'

cytoscape.use(edgehandles)


const prepareData = (data, row, startColumn, xSpace, idModifier, nameModifier = '') => {
  const padding = { x: 30, y: 50 }
  return _map(data, (value, index) => ({
    data: { id: idModifier + value, name: nameModifier + value },
    position: { "x": (index + startColumn) * xSpace + padding.x, "y": row * 150 + padding.y }
  }))
}

const style = [
  {
    selector: 'node[name]',
    style: {
      'content': 'data(name)',
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: '.eh-handle',
    style: {
      'background-color': 'blue',
      'width': 8,
      'height': 12,
      'shape': 'ellipse',
      'overlay-opacity': 0,
      'border-width': 12, // makes the handle easier to hit
      'border-opacity': 0,
    }
  },
  {
    selector: '.eh-hover',
    style: {
      'background-color': 'blue'
    }
  },
  {
    selector: '.eh-source',
    style: {
      'border-width': 2,
      'border-color': 'blue'
    }
  },
  {
    selector: '.eh-target',
    style: {
      'border-width': 2,
      'border-color': 'blue'
    }
  },
  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'background-color': 'blue',
      'line-color': 'blue',
      'target-arrow-color': 'blue',
      'source-arrow-color': 'blue'
    }
  },
  {
    selector: '.eh-ghost-edge.eh-preview-active',
    style: {
      'opacity': 0
    }
  }
]

/**
 * TODO: [] styling
 *       [] checks
 *       [] reset
 */
const Graph = ({ requiredStructure, importedStructure, optionalStructure, products, company, alert }) => {
  const [connection, setConnection] = useState(null)
  const [verified, setVerified] = useState(null)

  /**
   * TODO: change static 1000 width to the container size
   * Causion: Fileds on the same row must have same xSpace
   */
  const baseXSpace = useMemo(() => Math.round(1000 / (requiredStructure.length + optionalStructure.length)), [])
  const requiredFields = useMemo(() => prepareData(requiredStructure, 1, 0, baseXSpace, 'R', '*'), [])
  const optionalFields = useMemo(() => prepareData(optionalStructure, 1, requiredFields.length, baseXSpace, 'O'), [])

  const importedXSpace = useMemo(() => Math.round(1000 / importedStructure.length), [importedStructure])
  const importedFields = useMemo(() => prepareData(importedStructure, 0, 0, importedXSpace, 'I'), [importedStructure])

  /**
   * If new connection is created, we add it to the Connections Array if it's not already there
   */
  let connections = useMemo(() => [], [importedStructure])
  if (connection && !_some(connections, connection)) connections.push(connection)

  useEffect(() => {
    let cy = cytoscape({
      container: document.getElementById('graph'),
      layout: {
        name: 'preset'
      },
      style: style,
      elements: {
        nodes: [
          ...requiredFields,
          ...optionalFields,
          ...importedFields
        ],
      },
      userPanningEnabled: false,
      zoomingEnabled: false
    });

    cy.edgehandles();
    document.getElementById('graph').style.height = '250px';

    cy.on('ehcomplete', (event, source, target) => {
      setConnection({ from: source._private.data.name, to: target._private.data.name.replace('*', '') })
    })

    //TODO: clean up connections if import was changed
    return () => { }
  }, [importedStructure])

  const checkRequired = () => {
    const required = requiredStructure
    _forEach(connections, connection => {
      if (required.includes(connection.to)) _pull(required, connection.to)
    })
    if (required.length === 0) {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }

  const importProducts = () => {
    const resultProducts = []
    _forEach(products, product => {
      const newProduct = {}
      _forEach(connections, connection => {
        if (connection.to === 'specification') {
          if (!newProduct.specification) newProduct.specification = {}
          newProduct.specification[connection.from] = product[connection.from]
        } else {
          newProduct[connection.to] = product[connection.from]
        }
      })
      newProduct['company'] = company._id
      resultProducts.push(newProduct)
    })

    console.log(resultProducts)

    axios.post(BASE_URL + PRODUCT + POST + IMPORT, { products: resultProducts })
      .then(response => console.log(response.data.data))
      .catch(err => console.log(err.response.data.error))
  }


  return (
    <div className="container">
      <h5>Please connect fields from your file with fields, required by platform.</h5>
      <em>Fields with * are required</em>
      <div id="graph" ></div>
      {!verified && <button onClick={checkRequired}>Check</button>}
      {verified === false && <em>Please, connect all required fields...</em>}
      {verified && <button onClick={importProducts}>Restructure and import</button>}
    </div >
  );
}


export default React.memo(withAlert()(Graph))
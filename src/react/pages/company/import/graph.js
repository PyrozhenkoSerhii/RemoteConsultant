import React, { useState, useEffect, useMemo } from 'react';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'
import _pull from 'lodash/pull'
import _some from 'lodash/some'
import _mapKeys from 'lodash/mapKeys'

import { Button } from 'react-bootstrap'



cytoscape.use(edgehandles)


const prepareData = (data, row, startColumn, xSpace, idModifier, nameModifier = '') => {
  const padding = { x: 50, y: 50 }
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
      'background-color': 'black',
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
      'background-color': 'black'
    }
  },
  {
    selector: '.eh-source',
    style: {
      'border-width': 2,
      'border-color': 'black'
    }
  },
  {
    selector: '.eh-target',
    style: {
      'border-width': 2,
      'border-color': 'black'
    }
  },
  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'background-color': 'black',
      'line-color': 'black',
      'target-arrow-color': 'black',
      'source-arrow-color': 'black'
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
const Graph = ({ requiredStructure, importedStructure, optionalStructure, setConnections }) => {
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
      setConnections(connections)
    } else {
      setVerified(false)
    }
  }

  return (
    <div className="graph-wrapper animated-slide-down">
      <p className='header'>Connections</p>
      <p className='description'>Please connect fields from your file with fields, required by platform. Fields with * are required</p>

      <div id="graph" ></div>
      <Button variant={verified ? 'success' : 'primary'} onClick={checkRequired}>{verified === true ? 'Connections was set up' : 'Check'}</Button>
      {verified === false && <div className='stepper-error-wrapper'>
        <p className='error'>Please, connect all required fields</p>
      </div>}
    </div >
  );
}


export default React.memo(Graph)
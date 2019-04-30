import React, { useState } from 'react'
import _flatten from 'lodash/flatMapDepth'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'
import _isArray from 'lodash/isArray'
import _isObject from 'lodash/isObjectLike'

import { Button } from 'react-bootstrap'



const Adapter = ({ rawData, setImportedStructure, setFieldsPathMap, setStartPath }) => {
    let selectedFieldsGenerator = {}

    const [selected, setSelected] = useState(null)


    const isSelected = element => selected && element === selected.element ? 'chain-current' : 'chain-default'

    const buildIdentifier = type => ` : <${type}>`

    const deepForEach = (parent, data) => {
        _forEach(data, (element, field) => {
            const currentParent = parent ? `${parent}.${field}` : field

            if (_isArray(element)) element = element[0]

            if (typeof element === 'object') deepForEach(currentParent, element)
            else selectedFieldsGenerator[currentParent] = element
        })
    }

    const handleObjectSelection = (path, element) => {
        deepForEach(path, element)

        setSelected({
            fields: selectedFieldsGenerator,
            element: element,
            start: path
        })
    }

    const renderChain = (data, path = null, currentDepth = 0) => {
        currentDepth++

        return _map(data, (element, field) => {
            const currentPath = path ? `${path}.${field}` : field

            let dataType = buildIdentifier('object')
            if (_isArray(element)) {
                dataType = buildIdentifier('array')
                element = element[0]
            }

            if (_isObject(element)) {
                return (
                    <div key={field} className={isSelected(element)} style={{ paddingLeft: currentDepth * 15 }}>
                        <p className='chain-element' onClick={() => handleObjectSelection(currentPath, element)}>
                            <span>{field}</span>
                            <span className="type-identifier">{dataType}</span>
                        </p>
                        {renderChain(element, currentPath, currentDepth)}
                    </div>
                )
            }
        })
    }

    const renderSelected = () => {
        return _map(selected.fields, (value, path) => {
            const selectedField = path.split('.').pop()
            return (
                <p key={selectedField}>
                    <span>{selectedField}</span>
                    <span className="type-identifier">{buildIdentifier(typeof value)}</span>
                </p>
            )
        })
    }

    const handleApprove = () => {
        const fields = []
        const fieldsPathMap = {}
        _map(selected.fields, (value, path) => {
            const field = path.split('.').pop()

            fields.push(field)
            fieldsPathMap[field] = path.replace(`${selected.start}.`, '')
        })

        setImportedStructure(fields)
        setFieldsPathMap(fieldsPathMap)
        setStartPath(selected.start)
    }

    return (
        <React.Fragment>
            {renderChain(rawData)}
            <Button variant='primary' onClick={() => handleObjectSelection(null, rawData)}>Select All</Button>

            {selected && renderSelected()}
            {selected && <Button variant='success' onClick={handleApprove}>Approve</Button>}
        </React.Fragment>
    )
}


export default Adapter
import React, { useState, useMemo } from 'react'
import _flatten from 'lodash/flatMapDepth'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'




const Adapter = ({ rawData, setImportedStructure, setProducts }) => {
    const selectedFields = {}
    const [selected, setSelected] = useState(null)

    const [current, setCurrent] = useState(null)

    const renderChain = (data, parent = null, currentDepth = 0) => {
        currentDepth++

        return _map(data, (element, field) => {
            const currentParent = parent ? `${parent}.${field}` : field
            
            //TODO: implement styles for current
            const isCurrent = element === current 

            if (typeof element === 'object') {
                return (
                    <div key={field} style={{ paddingLeft: currentDepth * 10 }}>
                        <p onClick={() => handleSelectObject(currentParent, element)}>{field}</p>
                        {renderChain(element, currentParent, currentDepth)}
                    </div>
                )
            }
        })
    }

    const handleSelectObject = (parent, data) => {
        deepForEach(parent, data)
        setSelected(selectedFields)
        setCurrent(data)
    }


    const deepForEach = (parent, data) => {
        _forEach(data, (element, field) => {
            const currentParent = parent ? `${parent}.${field}` : field

            if (typeof element === 'object') deepForEach(currentParent, element)
            else selectedFields[currentParent] = element
        })
    }

    return (
        <React.Fragment>
            <h4>Select an object you want to start from:</h4>
            {renderChain(rawData)}

            <h4>Available fields</h4>
            {selected && _map(selected, field => (
                <p key={field}>{field}</p>
            ))}
        </React.Fragment>
    )
}


export default Adapter
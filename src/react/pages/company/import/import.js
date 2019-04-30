import React, { useState } from 'react'
import _forEach from 'lodash/forEach'
import _find from 'lodash/find'
import _isArray from 'lodash/isArray'
import axios from 'axios'
import { withAlert } from 'react-alert'

import { BASE_URL, PRODUCT, POST, IMPORT } from '../../../../config/routes'

import Settings from './settings'
import FileLoader from './file-loader'
import ApiLoader from './api-loader'
import Graph from './graph'
import Adapter from './adapter'

const API_MODE = 'API_MODE'
const FILE_MODE = 'FILE_MODE'


const testData = {
    data: {
        products: [{
            main: {
                name: 'LG',
                type: 'tv',
                cost: 1000,
                number: 1000,
            },
            image: 'http:...',
            additional: {
                size: '24inch',
                resolution: '1920',
                warranty: '24 months'
            }
        },
        {
            main: {
                name: 'Pixel',
                type: 'phone',
                cost: 1500,
                number: 1000,
            },
            image: 'http:...',
            additional: {
                size: '5inch',
                resolution: '1920',
                warranty: '24 months'
            }
        }],
        dummyObj: {
            test1: 'test1',
            test2: 'test2',
            test3: 'test3'
        }
    },
    header: {
        header1: {
            reqType: 'application/json'
        }
    },
    status: 200
}


const Import = ({ company, alert }) => {
    const [settings, setSettings] = useState(company.import)
    const [mode, setMode] = useState(settings.mode)
    const [saveAsPattern, setSaveAsPattern] = useState(false)

    // structures
    const requiredStructure = ['title', 'category', 'price', 'quantity']
    const optionalStructure = ['image', 'description', 'specification']

    const [importedStructure, setImportedStructure] = useState(null)
    const [connections, setConnections] = useState(null)
    const [fieldsPathMap, setFieldsPathMap] = useState(null)
    const [startPath, setStartPath] = useState(null)

    // data
    const [rawData, setRawData] = useState(null)
    const [uploadableProducts, setUploadableProducts] = useState(null)




    const restructure = () => {
        let startObject = rawData;
        _forEach(startPath.split('.'), part => startObject = startObject[part])

        if (!_isArray(startObject)) return alert('Wrong import data! Only <arrays> are supported!')

        const resultProducts = []
        _forEach(startObject, rawProduct => {
            const newProduct = {}
            _forEach(connections, connection => {
                const realPath = fieldsPathMap[connection.from]

                let data = rawProduct
                _forEach(realPath.split('.'), part => data = data[part])

                if (connection.to === 'specification') {
                    if (!newProduct.specification) newProduct.specification = {}
                    newProduct.specification[connection.from] = data
                } else {
                    newProduct[connection.to] = data
                }
            })

            newProduct['company'] = company._id
            resultProducts.push(newProduct)
        })

        if (saveAsPattern) setSettings({ ...settings, fieldsPathMap, connections, startPath })

        setUploadableProducts(resultProducts)
    }

    const handleSaveAsPattern = ({ target }) => setSaveAsPattern(target.checked)

    const uploadProducts = () => {
        axios.post(BASE_URL + PRODUCT + POST + IMPORT, { products: uploadableProducts })
            .then(response => console.log(response.data.data))
            .catch(err => console.log(err.response.data.error))
    }


    return (
        <React.Fragment>
            <Settings
                settings={settings}
                setSettings={setSettings}
                setMode={setMode}
                mode={mode}
                apiMode={API_MODE}
                fileMode={FILE_MODE}
            />
            {mode === FILE_MODE
                ? <FileLoader setRawData={setRawData} />
                : <ApiLoader setRawData={setRawData} url={settings.url} />
            }
            {rawData && <Adapter
                rawData={rawData}
                setImportedStructure={setImportedStructure}
                setFieldsPathMap={setFieldsPathMap}
                setStartPath={setStartPath}
            />}
            {importedStructure && <Graph
                importedStructure={importedStructure}
                requiredStructure={requiredStructure}
                optionalStructure={optionalStructure}
                setConnections={setConnections}
            />}
            {connections &&
                <div>
                    <input type="checkbox" onClick={handleSaveAsPattern}/>Save as this structure as a pattern
                    <button onClick={restructure}>Restructure</button>
                    <button onClick={uploadProducts}>Upload</button>
                </div>
            }
        </React.Fragment>
    )
}


export default withAlert()(Import)
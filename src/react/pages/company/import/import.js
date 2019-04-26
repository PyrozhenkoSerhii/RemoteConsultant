import React, { useState } from 'react'

import Settings from './settings'
import FileLoader from './file-loader'
import ApiLoader from './api-loader'
import Graph from './graph'
import Adapter from './adapter'

const API_MODE = 'API_MODE'
const FILE_MODE = 'FILE_MODE'


const Import = ({ company }) => {
    const [settings, setSettings] = useState(company.import)
    const [mode, setMode] = useState(settings.mode)

    // structures
    const [importedStructure, setImportedStructure] = useState(null)
    const requiredStructure = ['title', 'category', 'price', 'quantity']
    const optionalStructure = ['image', 'description', 'specification']

    // data
    const [rawData, setRawData] = useState(null)
    const [products, setProducts] = useState(null)
    const [uploadableProducts, setUploadableProducts] = useState(null)

    const rawData1 = {
        dummy1: {
            dummyNested11: {
                field11: 'field1-1-1',
                field12: 'field1-1-2',
                field13: 'field1-1-3',
                dummyNested111: {
                    field111: 'field1-1-1-1'
                }
            },
            dummyNested12: {
                field21: 'field1-2-1',
                field22: 'field1-2-2',
                field23: 'field1-2-3'
            }
        },
        dummy2: {
            dummyNested21: {
                field: 'field2-1'
            }
        },
        dummy3: 'field3'
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
            {rawData1 && <Adapter
                rawData={rawData1}
                setImportedStructure={setImportedStructure}
                setProducts={setProducts}
            />}
            {importedStructure && products && <Graph
                products={products}
                importedStructure={importedStructure}
                requiredStructure={requiredStructure}
                optionalStructure={optionalStructure}
                company={company}
            />}
        </React.Fragment>
    )
}


export default Import
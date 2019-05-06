import React, { useState } from 'react'
import _forEach from 'lodash/forEach'
import _find from 'lodash/find'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'
import { withAlert } from 'react-alert'

import axios from 'axios'
import { BASE_URL, PRODUCT, COMPANY, POST, PATCH, IMPORT, IMPORT_CONFIG } from '../../../../config/routes'

import Settings from './settings'
import FileLoader from './file-loader'
import ApiLoader from './api-loader'
import Graph from './graph'
import Adapter from './adapter'
import Stepper from './stepper'
import UploadComponent from '../../../Components/Company/Import/Upload'


const API_MODE = 'API_MODE'
const FILE_MODE = 'FILE_MODE'


const Import = ({ company, alert }) => {
    // component management
    const [step, setStep] = useState(1)
    const [pattern, setPattern] = useState(null)

    // structure
    const requiredStructure = ['title', 'category', 'price', 'quantity', 'image']
    const optionalStructure = ['description', 'specification']
    const [importedStructure, setImportedStructure] = useState(null)
    const [connections, setConnections] = useState(null)
    const [fieldsPathMap, setFieldsPathMap] = useState(null)
    const [startPath, setStartPath] = useState(null)

    // data
    const [rawData, setRawData] = useState(null)
    const [uploadableProducts, setUploadableProducts] = useState(null)

    //settings
    const [settings, setSettings] = useState(company.importConfig)
    const [switchState, setSwitchState] = useState(false)
    const updateSettings = config => {
        axios.patch(BASE_URL + COMPANY + PATCH + `${company._id}/` + IMPORT_CONFIG, { importConfig: config })
            .then(res => {
                setSettings(res.data.data.importConfig)
                alert.info('Configs were saved!')
            })
            .catch(err => {
                console.log(err.response.data.error)
                alert.error('Something went wrong :(')
            })
    }


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

        setUploadableProducts(resultProducts)
    }

    const uploadProducts = () => {
        if (switchState) {
            const newConfig = { ...settings, patterns: [...settings.patterns, { fieldsPathMap, connections, startPath }] }
            updateSettings(newConfig)
            setSettings(newConfig)
        }
        axios.post(BASE_URL + PRODUCT + POST + IMPORT, { products: uploadableProducts })
            .then(response => alert.info('Gracefully imported'))
            .catch(err => console.log(err.response.data.error))
    }

    const handleSwitchState = (event, checked) => setSwitchState(checked)

    const handleSetPattern = id => {
        const selectedPattern = _find(settings.patterns, { _id: id })

        setStartPath(selectedPattern.startPath)
        setFieldsPathMap(selectedPattern.fieldsPathMap)
        setConnections(selectedPattern.connections)

        setPattern(id)
    }

    if (step === 5 && !uploadableProducts) restructure()

    return (
        <React.Fragment>
            <Stepper
                step={step}
                setStep={setStep}
                rawData={rawData}
                importedStructure={importedStructure}
                connections={connections}
                url={settings.url}
                mode={settings.mode}
                apiMode={API_MODE}
                pattern={pattern}
            >
                {step === 1 && <Settings
                    settings={settings}
                    apiMode={API_MODE}
                    fileMode={FILE_MODE}
                    updateSettings={updateSettings}
                    pattern={pattern}
                    handleSetPattern={handleSetPattern}
                />}
                {step === 2 && settings.mode === FILE_MODE && <FileLoader setRawData={setRawData} />}
                {step === 2 && settings.mode === API_MODE && <ApiLoader setRawData={setRawData} url={settings.url} />}
                {step === 3 && <Adapter
                    rawData={rawData}
                    setImportedStructure={setImportedStructure}
                    setFieldsPathMap={setFieldsPathMap}
                    setStartPath={setStartPath}
                />}
                {step === 4 && <Graph
                    importedStructure={importedStructure}
                    requiredStructure={requiredStructure}
                    optionalStructure={optionalStructure}
                    setConnections={setConnections}
                />}
                {step === 5 && uploadableProducts && <UploadComponent
                    uploadableProducts={uploadableProducts}
                    switchState={switchState}
                    handleSwitchState={handleSwitchState}
                    uploadProducts={uploadProducts}
                />}
            </Stepper>

        </React.Fragment>
    )
}


export default withAlert()(Import)
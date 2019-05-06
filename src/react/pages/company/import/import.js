import React, { useState } from 'react'
import _forEach from 'lodash/forEach'
import _find from 'lodash/find'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'
import { withAlert } from 'react-alert'

import axios from 'axios'
import { BASE_URL, PRODUCT, POST, IMPORT } from '../../../../config/routes'

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
    const [step, setStep] = useState(1)

    // company settings
    const [settings, setSettings] = useState(company.importConfig)
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


    const [switchState, setSwitchState] = useState(false)

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

    const uploadProducts = () => {
        if(switchState) {
            //saving settings for future use
        }
        axios.post(BASE_URL + PRODUCT + POST + IMPORT, { products: uploadableProducts })
            .then(response => alert.info('Gracefully imported'))
            .catch(err => console.log(err.response.data.error))
    }

    const handleSwitchState = (event, checked) => setSwitchState(checked)

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
            >
                {step === 1 && <Settings
                    company={company}
                    settings={settings}
                    setSettings={setSettings}
                    apiMode={API_MODE}
                    fileMode={FILE_MODE}
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
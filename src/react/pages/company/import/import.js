import React, { useMemo, useState } from 'react'
import { withAlert } from 'react-alert'
import { useDropzone } from 'react-dropzone'
import BSON from 'bson'
import _forEach from 'lodash/forEach'
import _pull from 'lodash/pull'

import DropZoneComponent from '../../../Components/Company/Import/DropZone'
import graph from './graph'

const reader = new FileReader()
const MAX_DOCS_TO_READ = 1000


const Import = ({ company }) => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: '.json, .bson' })

    const requiredStructure = ['title', 'category', 'price', 'quantity']
    const optionalStructure = ['image', 'description', 'specification']

    const [importedStructure, setImportedStructure] = useState(null)
    const [products, setProducts] = useState(null)

    const confirmUpload = () => acceptedFiles.length > 0 && reader.readAsArrayBuffer(acceptedFiles[0])

    reader.onload = () => {
        const bufferFile = reader.result
        const parsed = []

        try {
            BSON.deserializeStream(new Uint8Array(bufferFile), 0, MAX_DOCS_TO_READ, parsed, 0)
        }
        catch (err) {
            /**
             * Since we don't know the exact quantity of documents, we will bump into error with empty bson obj
             * For now we can safely swallow it and get all available documents (not more than MAX_DOCS_TO_READ)
             */
        }
        finally {
            setProducts(parsed)
            let keys = Object.keys(parsed[0])
            _forEach(keys)
            setImportedStructure(Object.keys(parsed[0]))
        }
    }

    const dropDownClass = useMemo(() => {
        let className = 'baseStyle'
        className += isDragActive ? ' activeStyle ' : ''
        className += isDragAccept ? ' acceptStyle ' : ''
        className += isDragActive ? ' acceptStyle ' : ''
        return className
    }, [isDragAccept, isDragActive, isDragReject]);



    return (
        <React.Fragment>
            <DropZoneComponent
                files={acceptedFiles}
                rootProps={getRootProps}
                inputProps={getInputProps}
                confirmUpload={confirmUpload}
                dropDownClass={dropDownClass}
            />
            {importedStructure && <graph
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
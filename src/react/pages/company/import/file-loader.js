import React, { useMemo, useState } from 'react'
import BSON from 'bson'
import { useDropzone } from 'react-dropzone'
import _forEach from 'lodash/forEach'
import _map from 'lodash/map'

import DropZoneComponent from '../../../Components/Company/Import/DropZone'

const reader = new FileReader()
const MAX_DOCS_TO_READ = 1000

const reduntantFields = ['_id', 'id', '__v', 'updatedAt', 'createdAt']

const FileLoader = ({ setRawData }) => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: '.json, .bson' })

    const [verified, setVerified] = useState(false)

    let type = null
    const confirmUpload = () => {
        if (acceptedFiles.length > 0) {
            type = acceptedFiles[0].name.split('.').pop()

            if (type === 'json') {
                reader.readAsText(acceptedFiles[0])
            }
            if (type === 'bson') {
                reader.readAsArrayBuffer(acceptedFiles[0])
            }
        }
    }

    reader.onload = () => {
        const fileData = reader.result
        const parsed = []

        if (type === 'json') {
            var documents = fileData.split("\n")
            _forEach(documents, value => {
                if (value.length) {
                    parsed.push(JSON.parse(value))
                }
            })
        }
        if (type === 'bson') {
            try {
                BSON.deserializeStream(new Uint8Array(fileData), 0, MAX_DOCS_TO_READ, parsed, 0)
            }
            catch (err) {
                /**
                 * Since we don't know the exact quantity of documents, we will bump into error with empty bson obj
                 * For now we can safely swallow it and get all available documents (not more than MAX_DOCS_TO_READ)
                 */
            }
        }

        _map(parsed, value => {
            return clean(value)
        })

        setVerified(true)
        setRawData({ data: parsed, file: { type: type, count: parsed.length } })
    }


    const clean = data => {
        const pureObj = data
        _forEach(pureObj, (value, field) => {
            if (reduntantFields.includes(field)) {
                delete pureObj[field]
            }
        })
        return pureObj
    }


    const dropDownClass = useMemo(() => {
        let className = 'baseStyle'
        className += isDragActive ? ' activeStyle ' : ''
        className += isDragAccept ? ' acceptStyle ' : ''
        className += isDragActive ? ' acceptStyle ' : ''
        return className
    }, [isDragAccept, isDragActive, isDragReject]);


    return (
        <DropZoneComponent
            files={acceptedFiles}
            rootProps={getRootProps}
            inputProps={getInputProps}
            confirmUpload={confirmUpload}
            dropDownClass={dropDownClass}
            verified={verified}
        />
    )
}


export default FileLoader
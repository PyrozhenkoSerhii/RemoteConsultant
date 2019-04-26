import React, { useMemo } from 'react'
import BSON from 'bson'
import { useDropzone } from 'react-dropzone'

import DropZoneComponent from '../../../Components/Company/Import/DropZone'

const reader = new FileReader()
const MAX_DOCS_TO_READ = 1000


const FileLoader = ({ setRawData }) => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: '.json, .bson' })

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
            setRawData(parsed)
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
        <DropZoneComponent
            files={acceptedFiles}
            rootProps={getRootProps}
            inputProps={getInputProps}
            confirmUpload={confirmUpload}
            dropDownClass={dropDownClass}
        />
    )
}


export default FileLoader
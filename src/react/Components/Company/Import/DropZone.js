import React from 'react'
import { Button } from 'react-bootstrap'

const DropZone = ({ rootProps, inputProps, files, confirmUpload, dropDownClass }) => (
    <React.Fragment>
        <div {...rootProps({ className: dropDownClass })}>
            <input {...inputProps()} />
            <p>Drag&drop or click to select file.</p>
            <em>Only json and bson types are supported.</em>
        </div>
        {files.map(file => (
            <div key={file.path}>
                {file.path}
            </div>
        ))}
        <Button variant="primary" onClick={confirmUpload}>Confirm</Button>
    </React.Fragment>
)


export default DropZone
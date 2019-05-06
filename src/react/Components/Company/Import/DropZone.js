import React from 'react'
import { Button } from 'react-bootstrap'


const verifiedStyles = {
    true: {
        variant: 'success',
        text: 'File was successfully loaded, you can ether select new file or proceed to the next step'
    },
    false: {
        variant: 'primary',
        text: 'Load'
    }
}

const DropZone = ({ rootProps, inputProps, files, confirmUpload, dropDownClass, verified }) => (
    <div className='animated-slide-up'>
        <p className='header'>Data Import</p>

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
        <Button
            className='dropzone-btn'
            disabled={!files.length}
            variant={verifiedStyles[verified].variant}
            onClick={confirmUpload}>
            {verifiedStyles[verified].text}
        </Button>
    </div>
)


export default DropZone
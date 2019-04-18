import React from 'react'


const DropZone = ({ rootProps, inputProps, files, confirmUpload, dropDownClass }) => (
    <div className="container">
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
        <button onClick={confirmUpload}>Confirm</button>
    </div>
)


export default DropZone
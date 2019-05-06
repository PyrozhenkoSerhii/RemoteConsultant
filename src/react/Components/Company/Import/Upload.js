import React from 'react'
import { Button } from 'react-bootstrap'

import ProductComponent from '../Product'
import { Switch, FormControlLabel } from "@material-ui/core";


const Upload = ({ uploadableProducts, switchState, handleSwitchState, uploadProducts }) => (
    <div>
        <div className='upload-wrapper'>
            <div className='upload-example-wrapper'>
                <p className='sub-header'>Example of result product:</p>
                <ProductComponent
                    product={uploadableProducts[0]}
                    allowActions={false}
                />
            </div>
            <div className='upload-info-wrapper'>
                <p className='sub-header'>Check your data</p>
                <p className='text-center'>By clicking Upload button you are uploading {uploadableProducts.length} items </p>
                <p className='text-center'>Since action can't be undone, check the example of resulting product first</p>
                <p className='text-center'>You can save this connections and property set for future use</p>

                <div className='upload-actions-wrapper'>
                    <FormControlLabel
                        control={
                            <Switch checked={switchState} onChange={handleSwitchState} color='primary' />
                        }
                        label='You can save these settings as a pattern'
                    />
                    <Button variant="success" onClick={uploadProducts}>Upload</Button>
                </div>
            </div>
        </div>
    </div>
)


export default Upload
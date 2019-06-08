import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact'
import Select from '@material-ui/core/Select'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'


const getFileInputStyle = data => !data || !data.name ? '' : 'full-uploader'

const getFileInputIcon = data => !data || !data.name ? (<i className="fas fa-upload"></i>) : (<i className="fas fa-check"></i>) 

const getFIleInputLabel = (data, defaultLabel) => !data || !data.name ? defaultLabel : data.name 


const Popup = ({ title, structure, formData, handleUpdate, handleSubmit, handlePopup, checking }) => (
    <div className='popup-wrapper'>
        <div className='popup-body'>
            <MDBContainer>
                <MDBRow>
                    <MDBCol xl='3' />
                    <MDBCol md='6'>
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={handleSubmit}>
                                    <p className='h2 text-center py-4'>{title}</p>
                                    <div className='grey-text'>
                                        {structure.map(element => {
                                            return element.type === 'select' ?
                                                (
                                                    <FormControl key={element.name} className='popup-select'>
                                                        <InputLabel htmlFor={element.name}>{element.label}</InputLabel>
                                                        <Select
                                                            onChange={handleUpdate}
                                                            inputProps={{
                                                                name: element.name,
                                                                id: element.name,
                                                            }}
                                                            value={formData[element.name] || element.label}
                                                        >
                                                            {element.options.map(opt => (
                                                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                ) : element.type === 'file' ?
                                                    (
                                                        <div key={element.name} className="input-group popup-file">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="inputGroupFileAddon01">{getFileInputIcon(formData[element.name])}</span>
                                                            </div>
                                                            <div className={`custom-file ${getFileInputStyle(formData[element.name])}`}>
                                                                <input
                                                                    type="file"
                                                                    className='custom-file-input'
                                                                    id={element.name}
                                                                    onChange={handleUpdate}
                                                                    name={element.name}
                                                                />
                                                                <label className="custom-file-label" htmlFor={element.name}>{getFIleInputLabel(formData[element.name], element.label)}</label>
                                                            </div>
                                                        </div>
                                                    ) :
                                                    (
                                                        <MDBInput
                                                            key={element.name}
                                                            label={element.label}
                                                            icon={element.icon}
                                                            group
                                                            type={element.type}
                                                            validate
                                                            error='wrong'
                                                            success='right'
                                                            name={element.name}
                                                            onChange={handleUpdate}
                                                            value={formData[element.name] || ''}
                                                        />
                                                    )
                                        })}
                                    </div>
                                    <div className='text-center py-4 mt-3'>
                                        <MDBBtn color={checking ? 'warning' : 'primary'} type='submit' disabled={checking}>{!checking ? 'Submit' : 'Checking...'}</MDBBtn>
                                        <MDBBtn color='danger' type='button' onClick={() => handlePopup(null)}>Cancel</MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    </div>
)


export default Popup
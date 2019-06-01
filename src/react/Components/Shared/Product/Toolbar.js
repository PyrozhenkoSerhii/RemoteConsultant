import React from 'react'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact'


const Toolbar = ({ filters, handleSelectFilter, companies, categories }) => (
    <div className='filter-wrapper'>
        {companies && <FormControl className='material-select animated-slide-up'>
            <InputLabel htmlFor='company'>Company</InputLabel>
            <Select
                onChange={handleSelectFilter}
                name='company'
                id='company'
                value={filters.company}
            >
                {companies.map(company => (
                    <MenuItem key={company._id} value={company._id}>{company.title}</MenuItem>
                ))}
            </Select>
        </FormControl>}

        {categories && <FormControl className='material-select animated-slide-up'>
            <InputLabel htmlFor='category'>Category</InputLabel>
            <Select
                onChange={handleSelectFilter}
                name='category'
                id='category'
                value={filters.category}
            >
                {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
            </Select>
        </FormControl>}

        <MDBContainer>
            <MDBRow>
                <MDBCol md='6'>
                    <MDBInput
                        label='Min price'
                        icon='dollar-sign'
                        name='minPrice'
                        value={filters.minPrice}
                        onChange={handleSelectFilter}
                        group
                        type='number'
                    />
                </MDBCol>
                <MDBCol md='6'>
                    <MDBInput
                        label='Max price'
                        icon='dollar-sign'
                        name='maxPrice'
                        value={filters.minPrice}
                        onChange={handleSelectFilter}
                        group
                        type='number'
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>


        <FormControlLabel
            control={
                <Checkbox
                    checked={filters.availableOnly}
                    onChange={handleSelectFilter}
                    color='primary'
                    name='availableOnly'
                    value={filters.availableOnly}
                />
            }
            label='Available only'
        />
    </div>
)


export default Toolbar
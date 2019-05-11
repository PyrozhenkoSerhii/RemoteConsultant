import React from 'react'
import ToolbarComponent from '../../../Components/Shared/Product/Toolbar'


const Toolbar = ({ filters, setFilters }) => {
    const handleFilters = () => {

    }

    return (
        <ToolbarComponent
            filters={filters}
            handleFilters={handleFilters}
        />
    )
}


export default Toolbar
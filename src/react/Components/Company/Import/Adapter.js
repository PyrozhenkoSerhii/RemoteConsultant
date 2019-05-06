import React from 'react'
import { Button } from 'react-bootstrap'

const Adapter = ({renderChain, renderSelected, rawData, selected, approved, handleApprove }) => (
    <div className='animated-slide-down'>
        <p className='header'>Data selection</p>
        <p className='description'>Please, select the data you want to import. Usually, its an <b>Array</b> of data</p>

        <div className='adapter-wrapper'>
            <div className='adapter-objects'>
                {renderChain(rawData)}
            </div>
            <div className='adapter-props'>
                {selected && renderSelected()}
            </div>
            {selected &&
                <Button
                    variant={approved ? 'success' : 'primary'}
                    className='adapter-btn animated-slide-right'
                    onClick={handleApprove}>
                    {approved ? 'Approved successfully' : 'Approve'}
                </Button>}
        </div>
    </div>
)

export default Adapter
import React, { useContext, useState } from 'react'
import HomeComponent from '../../Components/Company/Home'


const Main = ({ company }) => (
    <React.Fragment>
        <HomeComponent company={company} />
    </React.Fragment>
)


export default React.memo(Main)
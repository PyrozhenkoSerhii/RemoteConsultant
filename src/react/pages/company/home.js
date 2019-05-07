import React from 'react'
import HomeComponent from '../../Components/Company/Home'


const Main = ({ company }) => {

    // TODO: get rid of hardcoded values
    const newRequests = 5
    const onlineConsultants = 23
    const itemsAvailable = 23212

    return <HomeComponent
        company={company}
        newRequests={newRequests}
        onlineConsultants={onlineConsultants}
        itemsAvailable={itemsAvailable}
    />
}


export default React.memo(Main)
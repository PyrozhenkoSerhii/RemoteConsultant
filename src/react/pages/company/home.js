import React from 'react'
import HomeComponent from '../../Components/Company/Home'


const Main = ({ company }) => {
    const newRequests = company.requests.length
    const onlineConsultants = company.consultants.length
    const itemsAvailable = company.products.length

    return <HomeComponent
        company={company}
        newRequests={newRequests}
        onlineConsultants={onlineConsultants}
        itemsAvailable={itemsAvailable}
    />
}


export default React.memo(Main)
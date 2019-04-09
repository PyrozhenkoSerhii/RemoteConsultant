import React, { useContext } from 'react'
import ProfileComponent from '../Components/Profile/Profile'

import { useHTTP } from '../hooks/http'
import representativeContext from '../state/context/representative-context';
import { BASE_URL, COMPANY, GET } from '../../config/routes'

const Profile = () => {
    const context = useContext(representativeContext)

    const [loading, data, error] = useHTTP(BASE_URL + COMPANY + GET, [], context.representative.company)

    return !loading && data ? <ProfileComponent data={data} /> : <p>Error: {error}</p>
}


export default Profile
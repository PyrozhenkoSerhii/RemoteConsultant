import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import representativeContext from '../../state/context/representative-context';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const context = useContext(representativeContext)
    return <Route {...rest} render={(props) => (
        context.token ? <Component {...props} {...rest}/> : <Redirect to='/login' />
    )} />
}


export default PrivateRoute
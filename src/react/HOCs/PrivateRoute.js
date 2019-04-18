import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import representativeContext from '../tools/state/context/global-context';


const PrivateRoute = ({ component: Component, entity, ...rest }) => {
    const context = useContext(representativeContext)
    return <Route {...rest} render={(props) => (
        context.accounts.tokens[entity] ? <Component {...props} {...rest} /> : <Redirect to='/' />
    )} />
}


export default PrivateRoute
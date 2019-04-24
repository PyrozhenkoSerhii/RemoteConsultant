import React, { useContext } from 'react'

import Authentication from './authentication'
import globalContext from '../tools/state/context/global-context'


// used currying to return a functional component which can use hooks 
const withAuthentication = (entity, callbackUrl, Component) => () => {
    const context = useContext(globalContext)

    if (!context.accounts.info[entity]) {
        return <Authentication callbackUrl={callbackUrl} entity={entity} />
    }

    return <Component />
}



export default withAuthentication
import React, { useContext } from 'react'

import Authentication from './authentication'
import globalContext from '../tools/state/context/global-context'


const withAuthentication = (entity, callbackUrl, Component) => {
    const withContextComponent = () => {
        const context = useContext(globalContext)

        if (!context.accounts.info[entity]) {
            return <Authentication callbackUrl={callbackUrl} entity={entity} />
        }

        return <Component />
    }
    return withContextComponent
}


export default withAuthentication
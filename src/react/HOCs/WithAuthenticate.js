import React, { useContext } from 'react'

import Authentication from '../distributor/authentication'
import globalContext from '../tools/state/context/global-context'


const WithAuthenticate = ({ entity, callbackUrl }) => Component => {
    const WithContextComponent = () => {
        const context = useContext(globalContext)

        if (!context.accounts.info[entity]) {
            return <Authentication callbackUrl={callbackUrl} entity={entity} action='login' />
        }

        return <Component/>
    }
    return WithContextComponent
}


export default WithAuthenticate
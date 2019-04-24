import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'

// pages
import HomePage from '../pages/consultant/home'

// componenents
import NavigationComponent from '../Components/Consultant/Navigation'

import withAuthentication from './withAuthentication'

// tools
import globalContext from '../tools/state/context/global-context';

const entity = 'consultant'
const callbackUrl = '/consultant'


const Consultant = () => {
    const context = useContext(globalContext)

    return (
        <React.Fragment>
            <NavigationComponent context={context} entity={entity} />

            <Switch>
                <Route exact path="/consultant" render={(props) => <HomePage {...props} consultant={context.accounts.info[entity]} />} />
            </Switch>
        </React.Fragment>
    )
}



export default withAuthentication(entity, callbackUrl, Consultant)

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavigationComponent from '../Components/Consultant/Navigation'
import homePage from '../pages/consultant/home'

import withAuthentication from './withAuthentication'

const entity = 'consultant'
const callbackUrl = '/consultant'


const Consultant = () => (
    <React.Fragment>
        <NavigationComponent />

        <Switch>
            <Route exact path="/consultant" component={homePage} />
        </Switch>
    </React.Fragment>
)


export default withAuthentication(entity, callbackUrl, Consultant)

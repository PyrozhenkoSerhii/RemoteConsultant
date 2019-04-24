import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavigationComponent from '../Components/Customer/Navigation'
import homePage from '../pages/customer/home'

import withAuthentication from './withAuthentication'

const entity = 'customer'
const callbackUrl = '/customer'


const Customer = () => (
    <React.Fragment>
        <NavigationComponent />

        <Switch>
            <Route exact path="/customer" component={homePage} />
        </Switch>
    </React.Fragment>
)


export default withAuthentication(entity, callbackUrl, Customer)

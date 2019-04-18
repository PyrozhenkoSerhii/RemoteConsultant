import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavigationComponent from '../Components/Customer/Navigation'
import loginPage from '../pages/customer/login'
import registerPage from '../pages/customer/register'
import homePage from '../pages/customer/home'


const Customer = () => (
    <React.Fragment>
        <NavigationComponent />

        <Switch>
            <Route exact path="/customer" component={homePage} />
            <Route path='/customer/login' component={loginPage} />
            <Route path='/customer/register' component={registerPage} />
        </Switch>
    </React.Fragment>
)


export default Customer

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavigationComponent from '../Components/Consultant/Navigation'
import loginPage from '../pages/consultant/login'
import registerPage from '../pages/consultant/register'
import homePage from '../pages/consultant/home'


const Consultant = () => (
    <React.Fragment>
        <NavigationComponent />

        <Switch>
            <Route exact path="/consultant" component={homePage} />
            <Route path='/consultant/login' component={loginPage} />
            <Route path='/consultant/register' component={registerPage} />
        </Switch>
    </React.Fragment>
)


export default Consultant

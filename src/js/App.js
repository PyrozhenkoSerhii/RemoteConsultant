import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from './Navigation'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'

import PrivateRoute from './Components/HOCs/PrivateRoute'


const App = () => {
    return (
        <React.Fragment>
            <Navigation />

            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' render={(props) => <Login {...props} />} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/profile" component={Profile} />
            </Switch>
        </React.Fragment>
    )
}


export default App

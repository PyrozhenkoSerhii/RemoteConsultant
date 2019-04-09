import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from './Navigation'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'

import PrivateRoute from './Components/HOCs/PrivateRoute'
import RepresentativeProvider from './state/providers/RepresentativeProvider'


const App = () => (
    <RepresentativeProvider>
        <Navigation />

        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' render={(props) => <Login {...props} />} />
            <Route path='/register' render={(props) => <Register {...props} />} />
            <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    </RepresentativeProvider>
)


export default App

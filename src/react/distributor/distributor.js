import React from 'react'
import { Route, Switch } from 'react-router-dom'

import DistributorComponent from '../Components/Distributor'
import companyPage from './company'
import consultantPage from './consultant'
import customerPage from './customer'

import GlobalProvider from '../tools/state/providers/GlobalProvider'


const Distributor = () => (
    <GlobalProvider>
        <Switch>
            <Route exact path='/' component={DistributorComponent} />

            <Route path='/company' component={companyPage} />
            <Route path='/customer' component={customerPage} />
            <Route path='/consultant' component={consultantPage} />
        </Switch>
    </GlobalProvider>
)


export default Distributor

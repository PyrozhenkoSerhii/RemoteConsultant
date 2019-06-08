import React from 'react'
import { Route, Switch } from 'react-router-dom'

import DistributorComponent from '../Components/Distributor'
import companyPage from './company'
import consultantPage from './consultant'
import customerPage from './customer'

import GlobalProvider from '../tools/state/providers/GlobalProvider'
import ProductProvider from '../tools/state/providers/ProductProvider'


const Distributor = () => (
    <GlobalProvider>
        <ProductProvider>
            <Switch>
                <Route exact path='/' component={DistributorComponent} />

                <Route path='/company' component={companyPage} />
                <Route path='/customer' component={customerPage} />
                <Route path='/consultant' component={consultantPage} />
            </Switch>
        </ProductProvider>
    </GlobalProvider>
)


export default Distributor

import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'

// pages
import ProductsPage from '../pages/shared/product/products'
import ProfilePage from '../pages/customer/profile'

// components
import NavigationComponent from '../Components/Customer/Navigation'

import withAuthentication from './withAuthentication'

// tools
import globalContext from '../tools/state/context/global-context'

// are used inside authentication to generalize its logic for different roles
const entity = 'customer'
const callbackUrl = '/customer'


const Customer = () => {
    const context = useContext(globalContext)

    return (<React.Fragment>
        <NavigationComponent context={context} entity={entity} />

        <Switch>
            <Route path='/customer' render={(props) => <ProductsPage {...props} />} />
            <Route path='/customer/profile' render={(props) => <ProfilePage {...props} customer={context.accounts[entity]} />} />
        </Switch>
    </React.Fragment>
    )
}


export default withAuthentication(entity, callbackUrl, Customer)

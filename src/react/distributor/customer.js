import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

// pages
import ProductsPage from '../pages/shared/product/products'
import ChatPage from '../pages/customer/chat'
import ProfilePage from '../pages/customer/profile'

// components
import NavigationComponent from '../Components/Customer/Navigation'

import withAuthentication from './withAuthentication'

// tools
import globalContext from '../tools/state/context/global-context'
import {useHTTP} from '../tools/hooks/http'
import { BASE_URL, CUSTOMER, GET } from '../../config/routes'


// TODO: switch to the location.path
// are used inside authentication to generalize its logic for different roles
const entity = 'customer'
const callbackUrl = '/customer'


const Customer = () => {
    const context = useContext(globalContext)

    const [loading, customer, error] = useHTTP(`${BASE_URL}${CUSTOMER}${GET}${context.accounts.info[entity]._id}`, []);
    useEffect(() => {
      if(customer) {
        context.update('customer', customer)
      }
    }, [customer])

    console.log(context);

    return (<React.Fragment>
        <NavigationComponent context={context} entity={entity} />

        <Switch>
            <Route exact path='/customer' render={(props) => <ProductsPage {...props} allowActions={true} customer={context.accounts.info[entity]} />} />
            <Route path='/customer/chat' render={(props) => <ChatPage {...props} customer={context.accounts.info[entity]} />} />
            <Route path='/customer/profile' render={(props) => <ProfilePage {...props} customer={context.accounts.info[entity]} />} />
        </Switch>
    </React.Fragment>
    )
}


export default withAuthentication(entity, callbackUrl, Customer)

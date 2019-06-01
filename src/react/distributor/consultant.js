import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'

// pages
import ProductsPage from '../pages/shared/product/products'
import ChatPage from '../pages/consultant/chat'
import ProfilePage from '../pages/consultant/profile'

// componenents
import NavigationComponent from '../Components/Consultant/Navigation'

import withAuthentication from './withAuthentication'

// tools
import globalContext from '../tools/state/context/global-context'

const entity = 'consultant'
const callbackUrl = '/consultant'


const Consultant = () => {
    const context = useContext(globalContext)   

    return (
        <React.Fragment>
            <NavigationComponent context={context} entity={entity} />

            <Switch>
                <Route exact path='/consultant' render={(props) => <ProfilePage {...props} consultant={context.accounts.info[entity]} />} />
                <Route path='/consultant/products' render={(props) => <ProductsPage {...props} allowActions={false} />} />
                <Route path='/consultant/chat' render={(props) => <ChatPage {...props} consultant={context.accounts.info[entity]} />} />
            </Switch>
        </React.Fragment>
    )
}



export default withAuthentication(entity, callbackUrl, Consultant)

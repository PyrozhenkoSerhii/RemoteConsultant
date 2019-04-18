import React, { useContext } from 'react'
import { Switch } from 'react-router-dom'

// pages
import certificatesPage from '../pages/company/certificates'
import consultantsPage from '../pages/company/consultants'
import homePage from '../pages/company/home'
import productsPage from '../pages/company/products'
import representativesPage from '../pages/company/representatives'
import requestsPage from '../pages/company/requests'
import importPage from '../pages/company/import/import'

// HOCs
import WithAuthenticate from '../HOCs/WithAuthenticate'
import PrivateRoute from '../HOCs/PrivateRoute'

// components
import NavigationComponent from '../Components/Company/Navigation'
import Loading from '../Components/Loading'
import Error from '../Components/Error'

// tools
import globalContext from '../tools/state/context/global-context';
import { BASE_URL, COMPANY, GET } from '../../config/routes'
import { buildUrl } from '../tools/functions/query'
import { useHTTP } from '../tools/hooks/http'

const entity = 'company'
const callbackUrl = '/company'


const Company = () => {
    const context = useContext(globalContext)

    const [loading, company, error] = useHTTP(buildUrl(BASE_URL + COMPANY + GET, context.accounts.info[entity].company), [])

    return (
        <React.Fragment>
            <NavigationComponent context={context} entity={entity} />

            {loading ? <Loading /> :
                !company ? <Error error={error} /> :
                    <Switch>
                        <PrivateRoute exact path="/company" component={homePage} entity={entity} />
                        <PrivateRoute path='/company/certificates' component={certificatesPage} company={company} entity={entity} />
                        <PrivateRoute exact path="/company/products" component={productsPage} company={company} entity={entity} />
                        <PrivateRoute path="/company/products/import" component={importPage} company={company} entity={entity} />
                        <PrivateRoute path="/company/requests" component={requestsPage} company={company} entity={entity} />
                        <PrivateRoute path="/company/consultants" component={consultantsPage} company={company} entity={entity} />
                        <PrivateRoute path="/company/representatives" component={representativesPage} company={company} entity={entity} />
                    </Switch>
            }
        </React.Fragment>
    )
}


export default WithAuthenticate({ entity, callbackUrl })(Company)

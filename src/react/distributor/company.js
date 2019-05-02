import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

// pages
import CertificatesPage from '../pages/company/certificates'
import ConsultantsPage from '../pages/company/consultants'
import HomePage from '../pages/company/home'
import ProductsPage from '../pages/company/products'
import RepresentativesPage from '../pages/company/representatives'
import RequestsPage from '../pages/company/requests'
import ImportPage from '../pages/company/import/import'

// components
import NavigationComponent from '../Components/Company/Navigation'
import Loading from '../Components/Loading'
import Error from '../Components/Error'

import withAuthentication from './withAuthentication'

// tools
import globalContext from '../tools/state/context/global-context';
import { BASE_URL, COMPANY, GET } from '../../config/routes'
import { buildUrl } from '../tools/functions/query'
import { useHTTP } from '../tools/hooks/http'

// are used inside authentication to generalize its logic for different roles
const entity = 'company'
const callbackUrl = '/company'


const Company = () => {
    const context = useContext(globalContext)

    const [loading, company, error] = useHTTP(buildUrl(BASE_URL + COMPANY + GET, context.accounts.info[entity].company), [])

    return (
        <React.Fragment>
            <NavigationComponent context={context} entity={entity} title={company && company.title}/>

            {loading ? <Loading /> :
                !company ? <Error error={error} /> :
                    <Switch>
                        <Route exact path="/company" render={(props) => <HomePage {...props} company={company} />} />
                        <Route path='/company/certificates' render={(props) => <CertificatesPage {...props} company={company} />} />
                        <Route exact path='/company/products' render={(props) => <ProductsPage {...props} company={company} />} />
                        <Route path='/company/products/import' render={(props) => <ImportPage {...props} company={company} />} />
                        <Route path='/company/requests' render={(props) => <RequestsPage {...props} company={company} />} />
                        <Route path='/company/consultants' render={(props) => <ConsultantsPage {...props} company={company} />} />
                        <Route path='/company/representatives' render={(props) => <RepresentativesPage {...props} company={company} />} />
                    </Switch>
            }
        </React.Fragment>
    )
}


export default withAuthentication(entity, callbackUrl, Company)

import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../Components/HOCs/PrivateRoute'

import { useHTTP } from '../../hooks/http'
import representativeContext from '../../state/context/representative-context';
import { BASE_URL, COMPANY, GET } from '../../../config/routes'
import { buildUrl } from '../../functions/query'

import Main from '../../Components/Company/Main'
import Navigation from './Navigation'

import Certificate from './subpages/Certificate'
import Product from './subpages/Product'
import Import from './subpages/Import'
import Request from './subpages/Request'
import Consultant from './subpages/Consultant'
import Representative from './subpages/Representative'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'

const Profile = () => {
    const context = useContext(representativeContext)

    const [loading, company, error] = useHTTP(buildUrl(BASE_URL + COMPANY + GET, context.representative.company), [])

    return (
        <React.Fragment>
            <Navigation />

            {loading ? <Loading /> :
                !company ? <Error error={error} /> :
                    <div className='company-wrapper'>

                        <Main company={company} />

                        <Switch>
                            <PrivateRoute path='/company/certificates' component={Certificate} data={company} />
                            <PrivateRoute exact path="/company/products" component={Product} data={company} />
                            <PrivateRoute path="/company/products/import" component={Import} data={company} />
                            <PrivateRoute path="/company/requests" component={Request} data={company} />
                            <PrivateRoute path="/company/consultants" component={Consultant} data={company} />
                            <PrivateRoute path="/company/representatives" component={Representative} data={company} />
                        </Switch>
                    </div>
            }

        </React.Fragment>
    )
}


export default Profile
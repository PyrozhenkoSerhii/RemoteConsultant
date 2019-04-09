import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../Components/HOCs/PrivateRoute'

import { useHTTP } from '../../hooks/http'
import representativeContext from '../../state/context/representative-context';
import { BASE_URL, COMPANY, GET } from '../../../config/routes'

import Main from '../../Components/Company/Main'
import Navigation from './Navigation'

import Certificate from './subpages/Certificate'
import Product from './subpages/Product'
import Import from './subpages/Import'
import Request from './subpages/Request'
import Consultant from './subpages/Consultant'
import Representative from './subpages/Representative'

const Profile = () => {
    const context = useContext(representativeContext)

    const [loading, data, error] = useHTTP(BASE_URL + COMPANY + GET, [], context.representative.company)

    return (
        <React.Fragment>
            <Navigation />

            {!loading && data &&
                <div className='company-wrapper'>

                    <Main data={data} />

                    <Switch>
                        <PrivateRoute path='/company/certificates' component={Certificate} />
                        <PrivateRoute exact path="/company/products" component={Product} />
                        <PrivateRoute path="/company/products/import" component={Import} />
                        <PrivateRoute path="/company/requests" component={Request} />
                        <PrivateRoute path="/company/consultants" component={Consultant} />
                        <PrivateRoute path="/company/representatives" component={Representative} />
                    </Switch>
                </div>
            }

            {!loading && error &&
                <div>Error occured {error}</div>
            }
        </React.Fragment>
    )
}


export default Profile
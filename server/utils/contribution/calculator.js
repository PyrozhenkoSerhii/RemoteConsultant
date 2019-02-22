import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import _find from 'lodash/find'

import Consultant from '../../models/Consultant'
import coefficients from './coeficients'
import Consultation from '../../models/Consultation'

import logger from '../logger';


exports.calculate = async (customer) => {
    const { consultants, averageUserAssessment } = await prepareData(customer)
}

const prepareData = async ({ username: customerUsername, orders }) => {
    try {
        const productTitle = orders[orders.length].product

        const allConsultationWithUserPromise = Consultation.find({ customer: customerUsername })
        const consultationsBeforeOrderPromise = Consultation.find({ customer: customerUsername, product: productTitle })

        const consultationsBeforeOrder = await consultationsBeforeOrderPromise;
        const consultants = []
        const consultantsName = []
        _forEach(consultationsBeforeOrder, item => {
            consultants.push({ username: item.consultant, ...item.survey, chat: item.chat })
            consultantsName.push(item.consultant)
        })

        const consultantsWithRating = await Consultant.find({ username: { $in: consultantsName } })
            .select({ "id": 0, "username": 1, "rating": 1 })

        _map(consultants, item => item[rating] = _find(consultantsWithRating, item.username).rating)
        /* Now, every consultant object has username, total rating and assessment from user  */

        const allConsultationWithUser = await allConsultationWithUserPromise;

        const userAssessments = []
        _forEach(allConsultationWithUser, ({ survey }) => userAssessments.push(...survey))

        const averageUserAssessment = 0 //TODO
        
        if (process.env.NODE_ENV === 'dev') {
            logger.log('Consultants data: ', consultants)
            logger.log('Average user assessment : ', averageUserAssessment)
        }
        return { consultants, averageUserAssessment }

    } catch (err) {
        logger.error(err)
    }


}




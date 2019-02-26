import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import _find from 'lodash/find'
import _assign from 'lodash/assign'

import Consultant from '../../models/Consultant'
import Consultation from '../../models/Consultation'
import Order from '../../models/Order'

import coefficients from './coeficients'

import logger from '../logger';


exports.calculate = async (order) => {
    const { engagedConsultants, averageCustomerAssessments } = await prepareData(order)


}


/*
    We have to get from db following data:
    
    Statistic:
        [x] total cons rating
        [x] total cons hours 
        [] total consultations
        [] total sales
        [] average assessment of customer

    From user:
        [x] competency
        [x] friendliness
        [x] alternative item
        [x] best consultant
*/

const fetchData = async (order) => {
    const { product: productTitle, customer: customerUsername, consultant: bestUsername } = order

    const consultationsPromise = Consultation.aggregate({ customer: customerUsername, product: productTitle })
    const customerConsultaionsPromise = Consultation.aggregate([
        { $match: { username: customerUsername } },
        { $group: { averageCompetency: { $avg: '$Rating' } } }
    ])
    const ordersPromise = Order.find({})

    const consultations = await consultationsPromise

    /**
     * get consultants who provided a consultation to customer
     * if the ordered product inside 'alternative' field it means that this consultant suggested to buy it 
     */
    const engagedConsultants = []
    const tempConsulultantsName = []
    const ideatorUsername = {}
    _forEach(consultations, item => {
        engagedConsultants.push({ username: item.consultant, ...item.survey })
        tempConsulultantsName.push(item.consultant)
        if (item.alternative === productTitle) ideatorUsername = item.username
    })

    const consultantsStatistic = await Consultant.find({ username: { $in: consultantsName } })
        .select({ "id": 0, "username": 1, "rating": 1, "onplatform": 1 })

    /**
     * merge consultant statistic and assessment from customer
     * check if consultant suggested an alternative product which was bought
     * check if consultant was selected as one who convinced customer to buy a product 
     * result object fields: {username, rating, onplatform, competence, friendliness, note, isbest, isideator}
     *  */
    _map(engagedConsultants, item => {
        _assign(item, _find(consultantsStatistic, { username: item.username }))
        item['isbest'] = item.username === bestUsername
        item['isideator'] = item.username === ideatorUsername
        return item
    })

    /**
     * get the average customer assessment
     */
    const customerConsultaions = await customerConsultaionsPromise
    const averageCustomerAssessments = {}


    /**
     * get the total sales and total consultations
     */

    return { engagedConsultants, averageCustomerAssessments }



}


const prepareData = async (customer, order) => {
    const result = {}

    const productTitle = order.product
    const customerUsername = customer.username

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
        .select({ "id": 0, "username": 1, "rating": 1, "onplatform": 1 })

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
}




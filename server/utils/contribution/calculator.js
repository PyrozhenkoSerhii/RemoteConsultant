import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _isUndefined from 'lodash/isUndefined'
import _sort from 'lodash/sortBy'
import _reduce from 'lodash/reduce'

import Consultant from '../../models/Consultant'
import Consultation from '../../models/Consultation'
import Order from '../../models/Order'
import logger from '../logger';
import { default as input } from '../validation/range'
import { default as output } from './coefficients'


/**
 * Function is called after an order was submitted
 * It returns a consultants contributions (in percentage)
 */
exports.calculate = async (order) => {
    const result = {}

    const engagedConsultants = await fetchData(order)

    const total = { consultations: 0, sales: 0 }
    _forEach(engagedConsultants, consultant => {
        total.consultations += consultant.consultationsCount
        total.sales += consultant.salesCount
    })

    const consultantEarned = {}
    let totalEarned = 0
    _forEach(engagedConsultants, consultant => {
        let points = 0

        if (consultant.isBest) points += output.isBest.max /* if best consultant*/
        if (consultant.isIdeator) points += output.isIdeator.max /* if suggested product */

        points += scale(consultant.rating, input.rating.min, input.rating.max, output.rating.min, output.rating.max) /* rating */
        points += scale(consultant.competence, input.competence.min, input.competence.max, output.competence.min, output.competence.max) /* competence */
        points += scale(consultant.friendliness, input.friendliness.min, input.friendliness.max, output.friendliness.min, output.friendliness.max) /* friendliness*/
        points += scale(consultant.consultationsCount, 0, total.consultations, output.consultantions.min, output.consultantions.max) /*  consultations ratio */
        points += scale(consultant.salesCount, 0, total.sales, output.sales.min, output.sales.max) /* sales ratio */

        consultantEarned[consultant.username] = points
        totalEarned += points
    })

    _map(engagedConsultants, consultant => {
        result[consultant.username] = Math.floor((consultantEarned[consultant.username] / totalEarned) * 100)
    })

    logger.log(`Consultants contribution after saling of '${order.product}' for user '${order.customer}': \n ${JSON.stringify(result)}`)

    return result
}


/**
 * Function to prepare a data to contribution calculation
 * It returns an array of consultants with all the data required for calculation
 */
const fetchData = async (order) => {
    const { product: productTitle, customer: customerUsername, consultant: bestUsername } = order

    const relevantConsultationsPromise = Consultation.find({ customer: customerUsername, product: productTitle })
    const ordersPromise = Order.find({})

    const relevantConsultations = await relevantConsultationsPromise

    /**
     * get consultants who provided a consultation to customer
     * if the ordered product inside 'alternative' field it means that this consultant suggested to buy it 
     */
    const engagedConsultants = []
    const tempConsulultantsName = []
    const ideatorUsername = ''
    _forEach(relevantConsultations, item => {
        engagedConsultants.push({ username: item.consultant, ...item.survey })
        tempConsulultantsName.push(item.consultant)
        if (item.alternative === productTitle) ideatorUsername = item.username
    })

    /**
     * get all required info about envolved consultants
     */
    const consultantsStatisticPromise = Consultant.find({ username: { $in: tempConsulultantsName } })
        .select({ "id": 0, "username": 1, "rating": 1 })

    const consultationsCountPromise = Consultation.aggregate([
        { $match: { consultant: { $in: tempConsulultantsName } } },
        { $group: { username: '$consultant', count: { $sum: 1 } } }
    ])

    const orders = await ordersPromise
    const consultantConsultations = await Consultation.find({ consultant: { $in: tempConsulultantsName } })
        .select({ "id": 0, "customer": 1, "product": 1, "consultant": 1 })

    const salesCount = {}
    _forEach(orders, order => {
        _forEach(consultantConsultations, consultation => {
            if (order.customer === consultation.customer && order.product === consultation.product)
                salesCount[order.consultant] = _isUndefined(salesCount[order.consultant]) ? 1 : ++salesCount[order.consultant]
        })
    })

    const consultantsStatistic = await consultantsStatisticPromise
    const consultationsCount = await consultationsCountPromise

    /**
     * merge consultant statistic and assessment from customer
     * check if consultant suggested an alternative product which was bought
     * check if consultant was selected as one who convinced customer to buy a product 
     * result object fields: {username, rating, competence, friendliness, note, consultationsCount, salesCount, isbest, isideator}
     *  */
    _map(engagedConsultants, item => {
        _assign(item, _find(consultantsStatistic, { username: item.username }))
        item['consultationsCount'] = consultationsCount[item.username].count
        item['salesCount'] = salesCount[item.username]
        item['isBest'] = item.username === bestUsername
        item['isIdeator'] = item.username === ideatorUsername
        return item
    })

    return engagedConsultants
}


/**
 * Function to transform input value to defined range
 * @param {number} value The value to transform
 * @param {number} inMin Min input value
 * @param {number} inMax Max input value
 * @param {number} outMin Lower bound of output range
 * @param {number} outMax Upper bound of output range
 */
const scale = (value, inMin, inMax, outMin, outMax) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin



const getValue = (sum, contribution) => {
    const result = {}
    const percentFromOrder = output.PERCENT_FROM_ORDER
    const sumToContribute = sum * (percentFromOrder / 100)

    _forEach(contribution, (coefficient, consultant) => result[consultant] = Math.floor(sumToContribute * (coefficient / 100)))

    return result
}
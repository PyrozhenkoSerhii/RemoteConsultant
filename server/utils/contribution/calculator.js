import _forEach from 'lodash/forEach'
import _map from 'lodash/map'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _isUndefined from 'lodash/isUndefined'

import Consultant from '../../models/Consultant'
import Consultation from '../../models/Consultation'
import Order from '../../models/Order'


exports.calculate = async (order) => {
    const { engagedConsultants, averageCustomerAssessments } = await fetchData(order)


}


const fetchData = async (order) => {
    const { product: productTitle, customer: customerUsername, consultant: bestUsername } = order

    const relevantConsultationsPromise = Consultation.find({ customer: customerUsername, product: productTitle })
    const averageCustomerAssessmentsPromise = Consultation.aggregate([
        { $match: { customer: customerUsername } },
        {
            $group: {
                customer: '$customer',
                competence: { $avg: '$survey.competence' },
                friendliness: { $avg: '$survey.friendliness' }
            }
        }
    ])
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
        .select({ "id": 0, "username": 1, "rating": 1, "onplatform": 1 })

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
     * result object fields: {username, rating, onplatform, competence, friendliness, note, consultationsCount, salesCount, isbest, isideator}
     *  */
    _map(engagedConsultants, item => {
        _assign(item, _find(consultantsStatistic, { username: item.username }))
        item['consultationsCount'] = consultationsCount[item.username].count
        item['salesCount'] = salesCount[item.username]
        item['isbest'] = item.username === bestUsername
        item['isideator'] = item.username === ideatorUsername
        return item
    })


    /**
     * get the average customer assessment
     */
    const averageCustomerAssessments = await averageCustomerAssessmentsPromise

    return { engagedConsultants, averageCustomerAssessments }
}
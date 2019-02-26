import Consultation from '../models/Consultation'
import logger from '../utils/logger'
import redis from '../utils/redis'

const ObjectId = require('mongoose').Types.ObjectId
const UNIQUE_CHECK_FAILED_CODE = 11000

exports.list = async (req, res) => {
    try {
        const consultations = await Consultation.find()
        return res.status(200).send({data: consultations})
    } catch (err) {
        res.status(500).send({ error: err })
    }
}


exports.get = async (req, res) => {
    const consultation = Consultation.findById(req.param.id)
}


exports.post = (req, res) => {

}


exports.patch = (req, res) => {

}


exports.put = (req, res) => {

}


exports.delete = (req, res) => {

}

import Company from '../models/Consultation'
import logger from '../utils/logger'
import redis from '../utils/redis'

const ObjectId = require('mongoose').Types.ObjectId
const UNIQUE_CHECK_FAILED_CODE = 11000

exports.list = (req, res) => {
    User.find((err, users) => {
        if (err) return res.status(500).send({ error: "Something went wrong while fetching all users." })

        return res.status(200).send({ data: users })
    });
}


exports.get = (req, res) => {

}


exports.post = (req, res) => {

}


exports.patch = (req, res) => {
    
}


exports.put = (req, res) => {

}


exports.delete = (req, res) => {
    
}

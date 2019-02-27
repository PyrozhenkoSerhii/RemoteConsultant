import express from 'express'
import _assignIn from 'lodash/assignIn'

import Consultant from '../models/Consultant'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/consultant/', wrap(async (req, res) => {

}))


router.get('/consultant/:id', wrap(async (req, res) => {

}))


router.post('/consultant/', wrap(async (req, res) => {

}))


router.put('/consultant/:id', wrap(async (req, res) => {

}))


router.delete('/consultant/:id', wrap(async (req, res) => {

}))


module.exports = router
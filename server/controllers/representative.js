import express from 'express'
import _assignIn from 'lodash/assignIn'

import Representative from '../models/Representative'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/representative/', wrap(async (req, res) => {

}))


router.get('/representative/:id', wrap(async (req, res) => {

}))


router.post('/representative/', wrap(async (req, res) => {

}))


router.put('/representative/:id', wrap(async (req, res) => {

}))


router.delete('/representative/:id', wrap(async (req, res) => {

}))


module.exports = router
import express from 'express'
import _assignIn from 'lodash/assignIn'

import Product from '../models/Product'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/product/', wrap(async (req, res) => {

}))


router.get('/product/:id', wrap(async (req, res) => {

}))


router.post('/product/', wrap(async (req, res) => {

}))


router.put('/product/:id', wrap(async (req, res) => {

}))


router.delete('/product/:id', wrap(async (req, res) => {

}))


module.exports = router
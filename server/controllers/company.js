import express from 'express'
import _assignIn from 'lodash/assignIn'

import Company from '../models/Company'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId

router.get('/company/', wrap(async (req, res) => {
    const orders = await Order.find()
    res.status(200).send({ data: orders })
}))


router.get('/company/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const order = await Order.findById(req.params.id)
    if (!order) return res.status(400).send({ error: `Order Not Found` })
    res.status(200).send({ data: order })
}))


router.post('/company', wrap(async (req, res) => {
    const order = new Order({ ...req.body })

    const invalid = order.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await order.save()
    res.status(201).send({ data: saved })
}))


router.put('/company/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const order = await Order.findById(req.params.id)
    if (!order) return res.status(400).send({ error: `Order Not Found` })

    _assignIn(order, req.body)

    const invalid = order.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await order.save()
    res.status(200).send({ data: saved })
}))


router.delete('/company/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const order = await Order.findById(req.params.id)
    if (!order) return res.status(400).send({ error: `Order Not Found` })

    await order.remove()
    res.status(200).send({ message: `Order deleted` })
}))


module.exports = router
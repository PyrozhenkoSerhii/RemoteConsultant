import express from 'express'
import _assignIn from 'lodash/assignIn'

import Order from '../models/Order'
import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators'

const router = express.Router()


router.get('/order/list/', wrap(async (req, res) => {
    const orders = await Order.find(req.query)
    res.status(200).send({ data: orders })
}))


router.get('/order/list/:id', isObjectId, wrap(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(400).send({ error: `Order Not Found` })
    res.status(200).send({ data: order })
}))


router.post('/order/', wrap(async (req, res) => {
    const order = new Order({ ...req.body })

    const invalid = order.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await order.save()

    res.status(201).send({ data: saved })
}))


module.exports = router
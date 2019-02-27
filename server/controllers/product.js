import express from 'express'
import _assignIn from 'lodash/assignIn'

import Product from '../models/Product'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/product/', wrap(async (req, res) => {
    const products = await Product.find()
    res.status(200).send({ data: products })
}))


router.get('/product/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })
    res.status(200).send({ data: product })
}))


router.post('/product/', wrap(async (req, res) => {
    const product = new Product({ ...req.body })

    const invalid = product.validateSync()
    if (invalid) return res.status(400).send({ errors: invalid })
}))


router.put('/product/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })

    _assignIn(product, req.body)

    const invalid = product.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await product.save()
    res.status(200).send({ data: saved })
}))


router.delete('/product/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })

    await product.remove()
    res.status(200).send({ message: `Product deleted` })
}))


module.exports = router
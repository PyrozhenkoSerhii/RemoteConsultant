import express from 'express'
import _merge from 'lodash/assignIn'

import Product from '../models/Product'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/product/list/', wrap(async (req, res) => {
    const products = await Product.find()
    res.status(200).send({ data: products })
}))


router.get('/product/list/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })
    res.status(200).send({ data: product })
}))


router.post('/product/', wrap(async (req, res) => {
    const product = new Product({ ...req.body })

    const invalid = product.validateSync()
    if (invalid) return res.status(400).send({ errors: invalid })

    const saved = await product.save()
    res.status(201).send({ data: saved })
}))


router.post('/product/import', wrap(async (req, res) => {
    /**
     * The array of products must be prepared before it gets here
     */
    const saved = Product.insertMany(req.body)
    res.status(200).send({ data: saved })
}))

router.put('/product/list/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })

    _merge(product, req.body)

    const invalid = product.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await product.save()
    res.status(200).send({ data: saved })
}))


router.delete('/product/list/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })

    await product.remove()
    res.status(200).send({ message: `Product deleted` })
}))


/**
 * Adding an opportunity to clear a collection for non-production environment
 */
process.env.NODE_ENV !== 'prod' && router.delete('/product/clear', wrap(async (req, res) => {
    await Product.deleteMany()

    const products = await Product.find()
    if (products.length) return res.status(500).send({ error: `Due to unknown reason products weren't deleted` })

    res.status(200).send({ message: 'Products were deleted' })
}))


module.exports = router
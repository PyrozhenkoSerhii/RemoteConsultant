import express from 'express'
import _assignIn from 'lodash/assignIn'
import _find from 'lodash/find'
import _isUndefined from 'lodash/isUndefined'
import _forEach from 'lodash/forEach'

import Product from '../models/Product'
import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators'

const router = express.Router()


router.get('/product/list/', wrap(async (req, res) => {
    const products = await Product.find(req.query)
    res.status(200).send({ data: products })
}))


router.get('/product/list/:id', isObjectId, wrap(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })
    res.status(200).send({ data: product })
}))


router.post('/product/', wrap(async (req, res) => {
    const product = new Product({ ...req.body })

    const validationError = product.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await product.save()
    res.status(201).send({ data: saved })
}))


router.put('/product/list/:id', isObjectId, wrap(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })

    _assignIn(product, req.body)

    const validationError = product.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await product.save()
    res.status(200).send({ data: saved })
}))


/**
 * Request body must be like:
 *  @param {string}  field Field you want to change
 *  @param {string|number|object}  value New value
 * Note: If you want to change a specification, provide an object like {attr1:val1, attr2:val2}
 *       If the attr and the value match the existent attr and val, this attr will be removed
 *       If the attr matches but its the value differs, the attr value will be changed
 *       Company field can't be changed
 */
router.patch('/product/list/:id', isObjectId, wrap(async (req, res) => {
    const { field, value } = req.body

    if (!field || !value) return res.status(400).send({ error: `Wrong data! Field and value must be provided` })

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(400).send({ error: `Product Not Found` })

    if (_isUndefined(product[field])) return res.status(400).send({ error: `Inexistent field provided: ${field}` })
    if (filed === 'company') return res.status(400).send({error: `Company can't be changed`})

    if (typeof product[field] !== 'object') {
        product[field] = value
    } else {
        if (typeof value !== 'object') return res.status(400).send({ error: `Field type and provided value type must match` })

        _forEach(value, (val, attr) => {
            const currentValue = product.specification[attr]

            if (currentValue && currentValue === val) delete product.specification[attr]
            else if (currentValue && currentValue !== val) product.specification[attr] = val
            else product.specification[attr] = val
        })

        product.markModified('specification')
    }

    const validationError = product.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await product.save()
    res.status(200).send({ data: saved })
}))


/**
 * Method to import bunch of company's products
 * Requst body must be like:
 * @param {array} products An array with Product objects to import
 * Note: Each objtct in array must match Product Schema
 *       Only first object is going to be validated due to performance reasons, so be careful what you put here!
 *       All not required fields may be saved in 'specification' field like {{attr1: val1}, {attr2: val2}}
 */
router.post('/product/import', wrap(async (req, res) => {
    const { products } = req.body

    if (!products || products instanceof Array === false || typeof products[0] !== 'object')
        return res.status(400).send({ error: `Imported data must be an array with objects` })

    const testProduct = new Product({ ...products[0] })
    const validationError = testProduct.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await Product.insertMany(products)
    res.status(200).send({ data: saved })
}))


router.delete('/product/list/:id', isObjectId, wrap(async (req, res) => {
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
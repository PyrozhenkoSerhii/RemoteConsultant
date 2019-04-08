import express from 'express'
import _isUndefined from 'lodash/isUndefined'

import Customer from '../models/Customer'
import { sign } from '../utils/jwt'

import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators';

const router = express.Router()


router.get('/customer/list/', wrap(async (req, res) => {
    const customer = await Customer.find()
    return res.status(200).send({ data: customer })
}))


router.get('/customer/list/:id', isObjectId, wrap(async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(400).send({ error: `Customer not found` })
    return res.status(200).send({ data: customer })
}))


router.post('/customer/', wrap(async (req, res) => {
    const customer = new Customer({ ...req.body })

    const validationError = customer.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await customer.save()
    res.status(201).send({ data: saved })
}))


router.post('/customer/authenticate', wrap(async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ error: 'Email and password are required!' })

    let customer = await Customer.findOne({ email: req.body.email }).select('+password').exec()
    if (!customer) return res.status(400).send({ error: `Email or password is incorrect` })

    const verified = await customer.verifyPassword(req.body.password)
    if (!verified) return res.status(400).send({ error: 'Email or password is incorrect' })

    const token = sign(customer)

    customer.password = undefined

    return res.status(200).send({ token, data: customer })
}))


/**
 * Request body must be like:
 *  @param {string}  field Field you want to change
 *  @param {string|number}  value New value
 */
router.patch('/customer/list/:id', isObjectId, wrap(async (req, res) => {
    const { field, value } = req.body

    if (!field || !value) return res.status(400).send({ error: `Wrong data! Field and value must be provided` })

    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(400).send({ error: `Customer Not Found` })

    if (typeof value === 'object') return res.status(400).send({ error: `Field type must match the provided value type` })

    customer[field] = value

    const validationError = customer.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await customer.save()
    if (saved.password) return res.status(200).send({ message: `Password was changed` })
    res.status(200).send({ data: saved })
}))


router.delete('/customer/list/:id', isObjectId, wrap(async (req, res) => {
    const customer = await RepreCustomersentative.findById(req.params.id)
    if (!customer) return res.status(400).send({ error: `Customer Not Found` })

    await customer.remove()
    res.status(200).send({ message: `Customer deleted` })
}))


/**
 * Adding an opportunity to clear a collection for non-production environment
 */
process.env.NODE_ENV !== 'prod' && router.delete('/customer/clear', wrap(async (req, res) => {
    await Customer.deleteMany()

    const customers = await Customer.find()
    if (customers.length) return res.status(500).send({ error: `Due to unknown reason customers weren't deleted` })

    res.status(200).send({ message: 'Customers were deleted' })
}))


module.exports = router
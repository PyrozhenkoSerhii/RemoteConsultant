import express from 'express'
import _assignIn from 'lodash/assignIn'
import _isUndefined from 'lodash/isUndefined'
import _forEach from 'lodash/forEach'

import Representative from '../models/Representative'
import Company from '../models/Company'

import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators'
import { sign } from '../utils/jwt'

const router = express.Router()


router.get('/representative/list', wrap(async (req, res) => {
    const representatives = await Representative.find(req.query)
    res.status(200).send({ data: representatives })
}))


router.get('/representative/list/:id', isObjectId, wrap(async (req, res) => {
    const representative = await Representative.findById(req.params.id)
    if (!representative) return res.status(400).send({ error: `Representative Not Found` })
    res.status(200).send({ data: representative })
}))


/**
 * Request body must be like:
 * @param {string} secret Secret from company to prove representative's identity
 * @param {object} representative Representative object you want to save
 */
router.post('/representative/', wrap(async (req, res) => {
    const { secret, data } = req.body

    if (!secret || !data) return res.status(400).send({ error: `Secret and personal info are required!` })

    const companies = await Company.find({}).select('+secret').exec()
    let match = null
    _forEach(companies, company => {
        if (company.secret === secret) {
            match = company
            return false
        }
    })
    if (!match) return res.status(400).send({ error: `Secret doesn't match any company` })
    data.company = match._id


    const representative = new Representative({ ...data })

    const validationError = representative.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await representative.save()
    res.status(201).send({ data: saved })
}))


router.post('/representative/authenticate', wrap(async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ error: 'Email and password are required!' })

    let representative = await Representative.findOne({ email: req.body.email }).select('+password').exec()
    if (!representative) return res.status(400).send({ error: `Email or password is incorrect` })

    const verified = await representative.verifyPassword(req.body.password)
    if (!verified) return res.status(400).send({ error: 'Email or password is incorrect' })

    const token = sign(representative)

    representative.password = undefined

    return res.status(200).send({ token, data: representative })
}))


/**
 * Request body must be like:
 *  @param {string}  field Field you want to change
 *  @param {string|number}  value New value
 * Note: Company field can't be changed
 */
router.patch('/representative/list/:id', isObjectId, wrap(async (req, res) => {
    const { field, value } = req.body

    if (!field || !value) return res.status(400).send({ error: `Wrong data! Field and value must be provided` })

    const representative = await Representative.findById(req.params.id)
    if (!representative) return res.status(400).send({ error: `Representative Not Found` })

    if (_isUndefined(representative[field])) return res.status(400).send({ error: `Inexistent field provided: ${field}` })
    if (field === 'company') return res.status(400).send({ error: `Company can't be changed` })
    if (typeof value === 'object') return res.status(400).send({ error: `Field type must match the provided value type` })

    representative[field] = value

    const validationError = representative.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await representative.save()
    res.status(200).send({ data: saved })
}))


router.delete('/representative/list/:id', isObjectId, wrap(async (req, res) => {
    const representative = await Representative.findById(req.params.id)
    if (!representative) return res.status(400).send({ error: `Representative Not Found` })

    await representative.remove()
    res.status(200).send({ message: `Representative deleted` })
}))


/**
 * Adding an opportunity to clear a collection for non-production environment
 */
process.env.NODE_ENV !== 'prod' && router.delete('/representative/clear', wrap(async (req, res) => {
    await Representative.deleteMany()

    const representatives = await Representative.find()
    if (representatives.length) return res.status(500).send({ error: `Due to unknown reason representatives weren't deleted` })

    res.status(200).send({ message: 'Representatives were deleted' })
}))


module.exports = router
import express from 'express'
import _assignIn from 'lodash/assignIn'
import _isUndefined from 'lodash/isUndefined'
import _find from 'lodash/find'

import Company from '../models/Company'
import Consultant from '../models/Consultant'

import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators'

const router = express.Router()


router.get('/company/list/', wrap(async (req, res) => {
    const companies = await Company.find()
    res.status(200).send({ data: companies })
}))


router.get('/company/list/:id', isObjectId, wrap(async (req, res) => {
    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })
    res.status(200).send({ data: company })
}))


router.post('/company/', wrap(async (req, res) => {
    const company = new Company({ ...req.body })

    const validationError = company.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await company.save()
    res.status(201).send({ data: saved })
}))


router.put('/company/list/:id', isObjectId, wrap(async (req, res) => {
    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    _assignIn(company, req.body)

    const validationError = company.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await company.save()
    res.status(200).send({ data: saved })
}))


/**
 * Request body must be like:
 *  @param {string}  field Field you want to change
 *  @param {string|object}  value New value
 * Note: If the value is already in an array, it will be removed
 *       Request field value must match the Requst Schema (submodel)
 */
router.patch('/company/list/:id', isObjectId, wrap(async (req, res) => {
    const { field, value } = req.body

    if (!field || !value) return res.status(400).send({ error: `Wrong data! Field and value must be provided` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    if (_isUndefined(company[field])) return res.status(400).send({ error: `Inexistent field provided: ${field}` })

    if (typeof company[field] !== 'object') {
        company[field] = value
    } else if (field !== 'requests') {
        const index = company[field].indexOf(value)
        index === -1 ? company[field].push(value) : company[field].pull(value)
    } else {
        if (typeof value !== 'object') return res.status(400).send({ error: `Field type and provided value type must match` })
        const subdoc = _find(company.requests, { consultant: value.consultant, message: value.message })
        subdoc && subdoc._id ? company.requests.pull(subdoc._id) : company.requests.push(value)
    }

    const validationError = company.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await company.save()
    res.status(200).send({ data: saved })
}))


/**
 * Method to approve or reject consultants request
 * Request body must be like:
 *  @param {boolean} approved Has consultants been request approved or not?
 *  @param {object}  request  Object of Request {consultant, message}
 */
router.patch('/company/list/:id/request', isObjectId, wrap(async (req, res) => {
    const { approved, request } = req.body

    if (!request || typeof request !== 'object') return res.status(400).send({ error: `Request must be an object type` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    const { _id, consultant: username } = _find(company.requests, { consultant: request.consultant, message: request.message })

    company.requests.pull(_id)

    if (approved) {
        const consultant = await Consultant.findOneAndUpdate({ username: username }, { $set: { company: company.title } }, { new: true })
        if (consultant.company !== company.title) return res.status(500).send(`Something went wrong while hiring consultant, ${consultant}`)
    }

    const saved = await company.save()
    return res.status(200).send({ data: saved })
}))


router.delete('/company/list/:id', isObjectId, wrap(async (req, res) => {
    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    await company.remove()
    res.status(200).send({ message: `Company deleted` })
}))


/**
 * Providing an opportunity to clear a collection for non-production environment
 */
process.env.NODE_ENV !== 'prod' && router.delete('/company/clear', wrap(async (req, res) => {
    await Company.deleteMany()

    const companies = await Company.find()
    if (companies.length) return res.status(500).send({ error: `Due to unknown reason companies weren't deleted` })

    res.status(200).send({ message: 'Companies were deleted' })
}))


module.exports = router
import express from 'express'

import _assignIn from 'lodash/assignIn'
import _pull from 'lodash/pull'
import _isUndefined from 'lodash/isUndefined'

import Company from '../models/Company'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/company/list/', wrap(async (req, res) => {
    const companies = await Company.find()
    res.status(200).send({ data: companies })
}))


router.get('/company/list/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

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


router.put('/company/list/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    _assignIn(company, req.body)

    const invalid = company.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await company.save()
    res.status(200).send({ data: saved })
}))


/**
 * This request is uses to change an arrays inside document
 * Request must have a 'removing' boolean field which specifies the action with arrays
 */
router.patch('/company/list/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })
    if (_isUndefined(company[req.body.field])) {
        return res.status(400).send({ error: `Inexistent field provided: ${req.body.field}` })
    }
    if (typeof company[req.body.field] !== 'object')
        return res.status(400).send({ error: `Invalid field provided: ${req.body.field}, field must be an array` })

    if (req.body.removing) {
        req.body.field = 'requests'
            ? _pull(company[req.body.field], req.body.value)
            : _pull(company[req.body.field], req.body.value)
    } else {
        company[req.body.field].push(req.body.value)
    }

    const validationError = company.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await company.save()
    res.status(200).send({ data: saved })
}))


router.patch('/company/list/:id/request', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    if(req.body.approved) {
        
    }


}))

router.delete('/company/list/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    await company.remove()
    res.status(200).send({ message: `Company deleted` })
}))


/**
 * Adding an opportunity to clear a collection for non-production environment
 */
process.env.NODE_ENV !== 'prod' && router.delete('/company/clear', wrap(async (req, res) => {
    await Company.deleteMany()

    const companies = await Company.find()
    if (companies.length) return res.status(500).send({ error: `Due to unknown reason companies weren't deleted` })

    res.status(200).send({ message: 'Companies were deleted' })
}))


module.exports = router
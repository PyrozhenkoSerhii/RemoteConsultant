import express from 'express'
import _assignIn from 'lodash/assignIn'

import Company from '../models/Company'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/company/', wrap(async (req, res) => {
    const companies = await Company.find()
    res.status(200).send({ data: companies })
}))


router.get('/company/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })
    res.status(200).send({ data: company })
}))


router.post('/company', wrap(async (req, res) => {
    const company = new Company({ ...req.body })

    const invalid = company.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await company.save()
    res.status(201).send({ data: saved })
}))


router.put('/company/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    _assignIn(company, req.body)

    const invalid = company.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await company.save()
    res.status(200).send({ data: saved })
}))


router.delete('/company/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const company = await Company.findById(req.params.id)
    if (!company) return res.status(400).send({ error: `Company Not Found` })

    await company.remove()
    res.status(200).send({ message: `Company deleted` })
}))


module.exports = router
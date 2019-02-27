import express from 'express'
import _assignIn from 'lodash/assignIn'

import Consultant from '../models/Consultant'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/consultant/', wrap(async (req, res) => {
    const consultants = await Consultant.find()
    res.status(200).send({ data: consultants })
}))


router.get('/consultant/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const consultant = await Consultant.findById(req.params.id)
    if (!consultant) return res.status(400).send({ error: `Consultant Not Found` })
    res.status(200).send({ data: consultant })
}))


router.post('/consultant/', wrap(async (req, res) => {
    const consultant = new Consultant({ ...req.body })

    const invalid = consultant.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await consultant.save()
    res.status(201).send({ data: saved })
}))


router.put('/consultant/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const consultant = await Consultant.findById(req.params.id)
    if (!consultant) return res.status(400).send({ error: `Consultant Not Found` })

    _assignIn(consultant, req.body)

    const invalid = consultant.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await consultant.save()
    res.status(200).send({ data: saved })
}))


router.delete('/consultant/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const consultant = await Consultant.findById(req.params.id)
    if (!consultant) return res.status(400).send({ error: `Consultant Not Found` })

    await consultant.remove()
    res.status(200).send({ message: `Consultant deleted` })
}))


module.exports = router
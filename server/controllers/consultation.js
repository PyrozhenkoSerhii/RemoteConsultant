import express from 'express'
import _assignIn from 'lodash/assignIn'

import Consultation from '../models/Consultation'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/consultation/', wrap(async (req, res) => {
    const consultations = await Consultation.find()
    res.status(200).send({ data: consultations })
}))


router.get('/consultation/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const consultation = await Consultation.findById(req.params.id)
    if (!consultation) return res.status(400).send({ error: `Consultation Not Found` })
    res.status(200).send({ data: consultation })
}))


router.post('/consultation/', wrap(async (req, res) => {
    const consultation = new Consultation({ ...req.body })

    const invalid = consultation.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await consultation.save()
    res.status(201).send({ data: saved })
}))


router.put('/consultation/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const consultation = await Consultation.findById(req.params.id)
    if (!consultation) return res.status(400).send({ error: `Consultation Not Found` })

    _assignIn(consultation, req.body)

    const invalid = consultation.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await consultation.save()
    res.status(200).send({ data: saved })
}))


router.delete('/consultation/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const consultation = await Consultation.findById(req.params.id)
    if (!consultation) return res.status(400).send({ error: `Consultation Not Found` })

    await consultation.remove()
    res.status(200).send({ message: `Consultation deleted` })
}))


module.exports = router
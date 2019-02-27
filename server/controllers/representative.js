import express from 'express'
import _assignIn from 'lodash/assignIn'

import Representative from '../models/Representative'
import wrap from '../middlewares/wrap'

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.get('/representative/', wrap(async (req, res) => {
    const representatives = await Representative.find()
    res.status(200).send({ data: representatives })
}))


router.get('/representative/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const representative = await Representative.findById(req.params.id)
    if (!representative) return res.status(400).send({ error: `Representative Not Found` })
    res.status(200).send({ data: representative })
}))


router.post('/representative/', wrap(async (req, res) => {
    const representative = new Representative({ ...req.body })

    const invalid = representative.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await representative.save()
    res.status(201).send({ data: saved })
}))


router.put('/representative/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const representative = await Representative.findById(req.params.id)
    if (!representative) return res.status(400).send({ error: `Representative Not Found` })

    _assignIn(representative, req.body)

    const invalid = representative.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await representative.save()
    res.status(200).send({ data: saved })
}))


router.delete('/representative/:id', wrap(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id provided: ${req.params.id}` })

    const representative = await Representative.findById(req.params.id)
    if (!representative) return res.status(400).send({ error: `Representative Not Found` })

    await representative.remove()
    res.status(200).send({ message: `Representative deleted` })
}))


module.exports = router
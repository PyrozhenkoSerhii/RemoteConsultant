import express from 'express'
import _assignIn from 'lodash/assignIn'

import Certificate from '../models/Certificate'
import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators'

const router = express.Router()


router.get('/certificate/list/', wrap(async (req, res) => {
    const certificates = await Certificate.find(req.query)
    res.status(200).send({ data: certificates })
}))


router.get('/certificate/list/:id', isObjectId, wrap(async (req, res) => {
    const certificate = await Certificate.findById(req.params.id)
    if (!certificate) return res.status(400).send({ error: `Certificate Not Found` })
    res.status(200).send({ data: certificate })
}))


router.post('/certificate/', wrap(async (req, res) => {
    const certificate = new Certificate({ ...req.body })

    const invalid = certificate.validateSync()
    if (invalid) return res.status(400).send({ error: invalid })

    const saved = await certificate.save()

    res.status(201).send({ data: saved })
}))


router.delete('/certificate/list/:id', wrap(async (req, res) => {
    const certificate = await Certificate.findById(req.params.id)
    if (!certificate) return res.status(400).send({ error: `Certificate Not Found` })

    await certificate.remove()
    res.status(200).send({ message: `Certificate deleted` })
}))


module.exports = router
import express from 'express'
import _merge from 'lodash/assignIn'
import _last from 'lodash/last'

import Consultation from '../models/Consultation'
import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators'

const router = express.Router()


router.get('/consultation/list/', wrap(async (req, res) => {
    const consultations = await Consultation.find()
    res.status(200).send({ data: consultations })
}))


router.get('/consultation/list/:id', isObjectId, wrap(async (req, res) => {
    const consultation = await Consultation.findById(req.params.id)
    if (!consultation) return res.status(400).send({ error: `Consultation Not Found` })
    res.status(200).send({ data: consultation })
}))


router.post('/consultation/', wrap(async (req, res) => {
    let consultation = new Consultation({ ...req.body })

    const validationError = consultation.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await consultation.save()
    res.status(201).send({ data: saved })
}))


router.put('/consultation/list/:id', isObjectId, wrap(async (req, res) => {
    const consultation = await Consultation.findById(req.params.id)
    if (!consultation) return res.status(400).send({ error: `Consultation Not Found` })

    _merge(consultation, req.body)

    const validationError = consultation.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await consultation.save()
    res.status(200).send({ data: saved })
}))


/**
 * Request body must be like:
 * @param {object} message Message object you want to insert
 */
router.patch('/consultation/list/:id/message', isObjectId, wrap(async (req, res) => {
    const consultation = await Consultation.findById(req.params.id)
    if (!consultation) return res.status(400).send({ error: `Consultation Not Found` })

    consultation.messages.push(req.body.message)

    const validationError = _last(consultation.messages).validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await consultation.save()
    res.status(200).send({ data: saved })
}))


router.delete('/consultation/list/:id', isObjectId, wrap(async (req, res) => {
    const consultation = await Consultation.findById(req.params.id)
    if (!consultation) return res.status(400).send({ error: `Consultation Not Found` })

    await consultation.remove()
    res.status(200).send({ message: `Consultation deleted` })
}))


/**
 * Adding an opportunity to clear a collection for non-production environment
 */
process.env.NODE_ENV !== 'prod' && router.delete('/consultation/clear', wrap(async (req, res) => {
    await Consultation.deleteMany()

    const consultations = await Consultation.find()
    if (consultations.length) return res.status(500).send({ error: `Due to unknown reason consultations weren't deleted` })

    res.status(200).send({ message: 'Consultations were deleted' })
}))


module.exports = router
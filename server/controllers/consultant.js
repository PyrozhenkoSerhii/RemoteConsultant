import express from 'express'
import _assignIn from 'lodash/assignIn'
import _forEach from 'lodash/forEach'

import { sign } from '../utils/jwt'
import Consultant from '../models/Consultant'
import wrap from '../middlewares/wrap'
import { isObjectId } from '../middlewares/validators'
import { images } from '../utils/validation/defaults'

const router = express.Router()


router.get('/consultant/list', wrap(async (req, res) => {
    const consultants = await Consultant.find(req.query)
    res.status(200).send({ data: consultants })
}))


router.get('/consultant/list/:id', isObjectId, wrap(async (req, res) => {
    const consultant = await Consultant.findById(req.params.id)
    if (!consultant) return res.status(400).send({ error: `Consultant Not Found` })
    res.status(200).send({ data: consultant })
}))


router.post('/consultant/', wrap(async (req, res) => {
    const consultant = new Consultant({ ...req.body })

    const validationError = consultant.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await consultant.save()
    res.status(201).send({ data: saved })
}))


router.post('/consultant/authenticate', wrap(async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ error: 'Email and password are required!' })

    let consultant = await Consultant.findOne({ email: req.body.email }).select('+password').exec()
    if (!consultant) return res.status(400).send({ error: `Email or password is incorrect` })

    const verified = await consultant.verifyPassword(req.body.password)
    if (!verified) return res.status(400).send({ error: 'Email or password is incorrect' })

    const token = sign(consultant)

    consultant.password = undefined

    return res.status(200).send({ token, data: consultant })
}))


/**
 * Request body must be like:
 *  @param {string} field Field you want to change
 *  @param {string|number|array|object|boolean}  value New value
 *  @param {string} old (Optional) Must be provided if you want to change password, 
 *  Note: 'Bill', 'verified', 'completed' fields can't be changed explicitly using this method
 *        'Completed' field may be set to true if all fields required for it was initialized
 */
router.patch('/consultant/list/:id', isObjectId, wrap(async (req, res) => {
    const { field, value, old } = req.body

    if (!field || !value) return res.status(400).send({ error: `Wrong data! Field and value must be provided` })
    if (['bill', 'verified', 'completed'].includes(field)) {
        return res.status(400).send({ error: `${field} field can't be changed this way ` })
    }

    const consultant = await Consultant.findById(req.params.id).select('+password').exec()
    if (!consultant) return res.status(400).send({ error: `Consultant Not Found` })

    if (field === 'password') {
        const verified = await consultant.verifyPassword(old)
        if (!verified) return res.status(400).send({ error: 'Old password is incorrect!' })
    }

    if (field === 'languages' && typeof value === 'object') {
        if (value instanceof Array === false) value = [value]

        //TODO: editing and removing of language and its certificate
        _forEach(value, language => consultant.language.push(language))

        consultant.markModified('languages')
    } else if (typeof value === 'string' || typeof value === 'number') {
        consultant[field] = value
    }

    const validationError = consultant.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    if (isCompleted(consultant)) consultant.completed = true

    const saved = await consultant.save()

    /* don't let the passport be sent to client */
    saved.password = undefined

    res.status(200).send({ data: saved })
}))


router.patch('/consultant/list/:id/chat', isObjectId, wrap(async (req, res) => {
    const consultant = await Consultant.findById(req.params.id)
    if (!consultant) return res.status(400).send({ error: `Consultant Not Found` })

    consultant.chat = req.body

    const validationError = consultant.validateSync()
    if (validationError) return res.status(400).send({ error: validationError.errors })

    const saved = await consultant.save()
    res.status(200).send({ data: saved })
}))


router.delete('/consultant/list/:id', isObjectId, wrap(async (req, res) => {
    const consultant = await Consultant.findById(req.params.id)
    if (!consultant) return res.status(400).send({ error: `Consultant Not Found` })

    await consultant.remove()
    res.status(200).send({ message: `Consultant deleted` })
}))


/**
 * Adding an opportunity to clear a collection for non-production environment
 */
process.env.NODE_ENV !== 'prod' && router.delete('/consultant/clear', wrap(async (req, res) => {
    await Consultant.deleteMany()

    const consultants = await Consultant.find()
    if (consultants.length) return res.status(500).send({ error: `Due to unknown reason consultants weren't deleted` })

    res.status(200).send({ message: 'Consultants were deleted' })
}))


const isCompleted = consultant => {
    return consultant.age && consultant.phone && consultant.image !== images.consultant
        && consultant.gender && consultant.certificate && consultant.verified
}

module.exports = router
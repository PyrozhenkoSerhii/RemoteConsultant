import express from 'express'
import _assignIn from 'lodash/assignIn'

import Company from '../models/Company'


const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId

router.get('/company/', (req, res) => {
    Company.find((err, companies) => {
        if (err) return res.status(500).send({ error: "Something went wrong while fetching all companies." })

        return res.status(200).send({ data: companies })
    });
})


router.get('/company/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id: ${req.params.id}` })

    Company.findById(req.params.id, (err, company) => {
        if (err) return res.status(400).send({ error: `Something went wrong while fetching company with id ${req.params.id}` })

        return res.status(200).send({ data: company })
    })
})


router.post('/company', (req, res) => {
    const { title, website, secret, info, image } = req.body
    const company = new Company({ title, website, secret, info, image })

    company.save((err, savedCompany) => {
        if (err) {
            let validationErrors = _.map(err.errors, error => {
                return { field: error.path, error: error.message }
            })

            if (validationErrors.length !== 0) return res.status(400).send({ errors: validationErrors })

            return err.code === UNIQUE_CHECK_FAILED_CODE
                ? res.status(400).send({ error: `Company with title ${title} is already exists` })
                : res.status(500).send({ error: `Something went wrong while creating company` })
        }

        return res.status(201).send({ data: savedCompany })
    })
})


router.put('/company/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id: ${req.params.id}` })

    Company.findById(req.params.id, (err, company) => {
        if (err) return res.status(500).send({ error: `Something went wrong while fetching a company with id ${req.params.id}` })
        if (!company) return res.status(400).send({ error: `Company with id ${req.params.id} wasn't found.` })

        _assignIn(company, req.body)

        company.save((err, updatedCompany) => {
            if (err) {
                let validationErrors = _.map(err.errors, error => {
                    return { field: error.path, error: error.message }
                })
                if (validationErrors.length !== 0) return res.status(400).send({ errors: validationErrors })

                return res.status(500).send({ error: `Something went wrong while updating company` })
            }

            return res.status(200).send({ message: 'User was updated' })
        })
    })
})


router.delete('/company/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send({ error: `Invalid id: ${req.params.id}` })

    Company.findById(req.params.id, (err, company) => {
        if (err) return res.status(500).send({ error: `Something went wrong while fetching company with id ${req.params.id}` })
        if (!company) return res.status(400).send({ error: `Company with id ${req.params.id} wasn't found.` })

        company.remove(err => {
            if (err) return res.status(500).send({ error: `Something went wrong while deleting company with id ${req.params.id}.` })

            return res.status(200).send({ message: 'Company was deleted' })
        })
    })
})


module.exports = router
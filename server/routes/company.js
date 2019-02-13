import express from 'express'
import ExpressBrute from 'express-brute'

import Controller from '../controllers/company'    

const router = express.Router()

const store = new ExpressBrute.MemoryStore()
const isTest = process.env.NODE_ENV === 'test'
const options = {
    freeRetries: isTest ? 30 : 2,
    minWait: 3000
}
const bruteforce = new ExpressBrute(store, options)


router.get('/', Controller.list)
router.get('/:id', Controller.get)
router.post('/', bruteforce.prevent, Controller.post)
router.put('/:id', Controller.put)
router.delete('/:id', Controller.delete)

module.exports = router
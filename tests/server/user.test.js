import request from 'supertest'
import chai from 'chai'
import async from 'async'
import mongoose from 'mongoose'

import router from '../../server/server'
import testData from '../../server/mocs/user'
import Customer from '../../server/models/Customer'

const environment = process.env.NODE_ENV || 'dev'

const assert = chai.assert
let insertedUser = undefined

/**
 * IMPORTANT
 * Ensure that you have added a valid test database to the config.js file
 * DON'T provide your production database because of an initial data cleaning 
 * Tests would fall if no valid database was provided 
 */

describe('=== Customer Controller ===', () => {
    before(done => {
        if (environment === 'test') {
            Customer.deleteMany({}, err => {
                if (err) console.log(err)
                // IMPORTANT! Waiting for loading of all the api components, especially node-mailer
                setTimeout(() => done(), 1500)
            })
        }
    })

    after(done => {
        if (environment === 'test') {
            Customer.deleteMany({}, err => {
                if (err) console.log(err)
                mongoose.disconnect(err => {
                    if (err) console.log(err)
                    done()
                })
            })
        }
    })

    it("GET /api/customer", done => {
        request(router).get('/api/customer/list')
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 200, 'Status must be 200')
                assert.typeOf(res.body.data, 'array', 'Returned data must be an array')

                done()
            })
    })
    it("POST /api/customer [valid]", done => {
        request(router).post('/api/customer')
            .send(testData.valid).set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 201, 'Status must be 201')
                assert.notTypeOf(res.body.data, 'undefined', 'Response must contain the data')
                assert.typeOf(res.body.error, 'undefined', 'Response mustn\'t contain errors')

                insertedUser = res.body.data._id

                done()
            })
    })
    it("POST /api/customer [duplicate email]", done => {
        request(router).post('/api/customer')
            .send(testData.existing).set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 400, 'Status must be 400')
                assert.notTypeOf(res.body.error, 'undefined', 'Email unique error must be raised')

                done()
            })
    })
    it("POST /api/customer [wrong data]", done => {
        async.series([
            cb => request(router).post('/api/customer').send(testData.wrongUsername).expect(400, cb),
            cb => request(router).post('/api/customer').send(testData.wrongEmail).expect(400, cb),
            cb => request(router).post('/api/customer').send(testData.wrongPassword).expect(400, cb),
            cb => request(router).post('/api/customer').send(testData.wrongAge).expect(400, cb),
            cb => request(router).post('/api/customer').send(testData.wrongImage).expect(400, cb),
            cb => request(router).post('/api/customer').send(testData.empty).expect(400, cb),
        ], done)
    })
    it("GET /api/customer/:id", done => {
        request(router).get(`/api/customer/list/${insertedUser}`)
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 200, 'Status must be 200')
                assert.notTypeOf(res.body.data, 'undefined', 'Response must contain the data')

                done()
            })
    })
    it("AUTHENTICATE /api/customer/authenticate [missed pass]", done => {
        request(router).post('/api/customer/authenticate')
            .send(testData.authMissed)
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 400, 'Status must be 400')
                assert.notTypeOf(res.body.error, 'undefined', 'Response must contain an error')

                done()
            })
    })
    it("AUTHENTICATE /api/customer/authenticate [verified]", done => {
        request(router).post('/api/customer/authenticate')
            .send(testData.auth)
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 200, 'Status must be 200')
                assert.notTypeOf(res.body.token, 'undefined', 'Response must contain a token')

                done()
            })
    })
    it("PATCH /api/customer/list/:id", done => {
        request(router).patch(`/api/customer/list/${insertedUser}`)
            .send(testData.update)
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 200, 'Status must be 200')
                assert.notTypeOf(res.body.data, 'undefined', 'Response must containt an updated data')

                done()
            })

    })
    it("DELETE /api/customer/list", done => {
        
        request(router).delete(`/api/customer/list/${insertedUser}`)
            .end((err, res) => {
                if (err) throw done(err)

                assert.equal(res.status, 200, 'Status must be 200')
                assert.notTypeOf(res.body.message, 'undefined', 'Response must containt a message')

                done()
            })
    })
})


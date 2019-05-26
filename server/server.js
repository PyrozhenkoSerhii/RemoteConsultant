import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import jwt from 'express-jwt'
import blacklist from 'express-jwt-blacklist'
import mongoose from 'mongoose'
import requestLimiter from 'express-rate-limit'
import helmet from 'helmet'
import fs from 'fs'
import peer from 'peer'

import config from './config'
import loggerMiddleware from './middlewares/logger'
import errorHandler from './middlewares/errorHandler'
import logger from './utils/logger'

import customer from './controllers/сustomer'
import company from './controllers/company'
import consultant from './controllers/consultant'
import consultation from './controllers/consultation'
import product from './controllers/product'
import representative from './controllers/representative'
import order from './controllers/order'
import certificate from './controllers/certificate'


const api = express()
const limiter = requestLimiter({
  windowsMs: 15 * 60 * 1000,
  max: 100
})
blacklist.configure({
  store: {
    type: 'redis',
    host: config.redis.host,
    port: config.redis.port,
  }
})

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const enviroment = process.env.NODE_ENV || 'dev'
if (enviroment === 'dev') api.enable('trust proxy')

api.use(helmet())
api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())
api.use(limiter)

api.use(loggerMiddleware)

api.use(express.static(path.join(__dirname, '../public')))
api.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// force jwt to work in production env only
enviroment === 'prod' && api.use(jwt({ secret: config.api.secret }).unless(req =>
  req.originalUrl.match(/^((?!api).)*$/) ||
  req.originalUrl === '/api/customers' && req.method === 'POST' ||
  req.originalUrl === '/api/consultant' && req.method === 'POST' ||
  req.originalUrl === '/api/representative' && req.method === 'POST' ||
  req.originalUrl === '/api/customer/authenticate' ||
  req.originalUrl === '/api/consultant/authenticate' ||
  req.originalUrl === '/api/representative/authenticate'
))
enviroment === 'prod' && api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    logger.warn(`[JWT] No authorization provided with request ${req.originalUrl}`)
    res.status(401).send({ error: `You have no permitions to make this request` })
  }
})

api.use('/api/', customer)
api.use('/api/', product)
api.use('/api/', company)
api.use('/api/', consultant)
api.use('/api/', consultation)
api.use('/api/', representative)
api.use('/api/', order)
api.use('/api/', certificate)
api.use(errorHandler)
api.all('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
  res.status(404).send({ error: `Path ${req.originalUrl} with method ${req.method} not found!` })
})

mongoose.connect(config.db.connectionString, config.db.options).then(
  () => logger.info(`[API] Connection to ${config.db.databaseName} db was established `),
  err => logger.error(`[API] Error occured while connection to ${config.db.databaseName} db`, err)
)
mongoose.set('useCreateIndex', true)
enviroment === 'dev' && mongoose.set('debug', (coll, method) => {
  logger.info(`[Mongoose] Path: /${coll}, method: ${method}`)
});


const port = process.env.PORT || config.api.port

const server = api.listen(port, err => {
  if (err) {
    logger.error(`[API] Error while launhing the server: ${err}`)
    process.exit(1)
  } else {
    logger.info(`[API] Server is running on port ${port}`)
  }
})


const ExpressPeerServer = peer.ExpressPeerServer
const peerServer = ExpressPeerServer(server, {
  ssl: {
    key: fs.readFileSync('ssl/key.pem', 'utf8'),
    cert: fs.readFileSync('ssl/cert.pem', 'utf8')
  }
})


api.use('/p2p/', peerServer)


exports.default = api
exports.peerServer = peerServer
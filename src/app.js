import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import router from './router'
import { logger } from './utils'

// Configure environment variables
let environmentVariables = process.env
dotenv.config()

// Use bluebird to handle unhandled & uncaught promise errors
global.Promise = require('bluebird')
process.on('uncaughtException', err => logger.error('uncaughtException', err))
process.on('unhandledRejection', err => logger.error('unhandledRejection', err))

// Configure express
const app = express()

app.set('port', environmentVariables.PORT)
app.set('env', environmentVariables.NODE_ENV)

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router(app)

export default app
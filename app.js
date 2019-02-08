require('dotenv').config()
const express = require('express')
const sls = require('serverless-http')
const app = express()
const controller = require('./server/controller')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

require('./server/config/mongoose')(app)

app.get('/', async (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/weeks', controller.getCurrentWeek)
app.post('/weeks', controller.createNewWeek)
app.post('/weeks/:id/vote/:type', controller.vote)

module.exports.server = sls(app)
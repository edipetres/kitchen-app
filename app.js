if (process.env.HOST !== 'aws') {
  console.log('Loading dotenv...')
  require('dotenv').config()
}
const express = require('express')
const sls = require('serverless-http')
const app = express()
const controller = require('./server/controller')
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
})

app.use(bodyParser.json())

require('./server/config/mongoose')(app)

app.get('/', async (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/weeks', controller.getCurrentWeek)
app.post('/weeks', controller.createNewWeek)
app.post('/weeks/:id/vote/:type', controller.vote)

module.exports.server = sls(app)
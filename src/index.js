#!/usr/bin/env node

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { actionHandler } = require('./actions')

app.use(bodyParser.json())

const port = process.env.PORT || 8080

const message = {
  success: false
}

app.all('/*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.post('/capture-webpage-screenshot', (req, res) => {
  actionHandler(req.body)
    .then(url => {
      message.success = true
      // @TODO: Replace w/ link to file on S3
      message.url = 'https://urlpip.es'
      res.json(message)
    })
    .catch(er => {
      message.error = er.message
      res.status(500).json(message)
    })
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(port, () =>
  console.log(`Listening on localhost: http://localhost:${port}`)
)

const express = require('express')
const app = express()

// Service
const userService = require('./services/userService')

app.get('/', function (req, res) {
  res.send('Welcome to Grocery Service APIs.')
})

app.listen(3000, function () {
  console.log('Web app service listening on port 3000!')
})
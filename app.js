const express = require('express')
const app = express()

const passport = require('./passport')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

// Router
const userRouter = require('./routes/user')

// user Router
app.use('/user', userRouter);

app.get('/', function (req, res) {
  res.send('Welcome to Grocery Service APIs.')
})

app.listen(3000, function () {
  console.log('Web app service listening on port 3000!')
})
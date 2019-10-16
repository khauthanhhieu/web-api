const express = require('express')
const app = express()

const jwt = require('jsonwebtoken');
const passport = require('./passport')
const AuthService = require('./services/auth')

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

app.get('/me', function(req, res) {
  console.log("GET '/me'")
  let authService = new AuthService(req, res)
  authService.getMe()
})

app.listen(3000, function () {
  console.log('Web app service listening on port 3000!')
})
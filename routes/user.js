const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth')
const UserService = require('../services/user')

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function (req, res) {
    console.log("POST '/user/login'")
    let authServiceObj = new AuthService(req, res)
    authServiceObj.login()
    
});

router.post('/register', function(req, res) {
    console.log("POST '/user/register'")
    let userServiceObj = new UserService(req, res)
    userServiceObj.register();
    
})

module.exports = router;
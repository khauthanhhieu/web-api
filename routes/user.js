const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth')

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function (req, res, next) {
    console.log("POST '/user/login'")
    let authServiceObj = new AuthService(req, res)
    authServiceObj.login();
    
});

router.get('/profile', function (req, res, next) {
    res.send(req.user);
});

module.exports = router;
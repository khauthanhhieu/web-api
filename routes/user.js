const express = require('express');
const router = express.Router();
const UserService = require('../services/user')

router.get('/', function (req, res, next) {
    let userServiceObj = new UserService(req, res)
    userServiceObj.getUser()
});

router.get('/profile', function (req, res, next) {
    res.send(req.user);
});

module.exports = router;
const UserService = require('./user')
const passport = require('passport')
const jwt = require('jsonwebtoken');

class AuthService {
    constructor(req, res) {
        this.userServiceObj = new UserService(req, res)
        this.req = req
        this.res = res
    }

    login() {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return this.res.status(400).json({
                    message: 'Something is not right'
                })
            }
            this.req.login(user, { session: false }, (err) => {
                if (err)
                    this.res.send(err)
            })
            const token = jwt.sign(user, 'doctor');
            return this.res.json({ token })
        })(this.req, this.res)
    }

    getMe() {
        let self = this
        jwt.verify(this.req.headers['token'], 'doctor', function (err, data) {
            if (err) {
                return self.res.status(403).json({
                    message: err
                })
            }
            return self.res.json({
                message: 'Successful',
                data
            })
        });
    }

}

module.exports = AuthService;
const UserService = require('./user')
const passport = require('passport')

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
                    message: 'Something is not right',
                    user: user
                })
            }
            this.req.login(user, {session : false}, (err) => {
                if (err)
                    this.res.send(err)
            })

            const token = jwt.sign(user, 'doctor');
            return this.res.json({user, token})
        })(this.req, this.res)
    }
}

module.exports = AuthService;
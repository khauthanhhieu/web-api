const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserService = require('./services/user')

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, cb) {
    return UserService.findOne(username, password)
        .then(user => {
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' })
            }
            return cb(null, user, { message: 'Logged In Successfully' })
        })
        .catch(err => cb(err))
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'doctor'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return UserService.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));
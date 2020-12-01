const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("Bearer"),
    secretOrKey: "dns"
}

// Authenticatoion using passport-jwt
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    Doctor.findById(jwtPayLoad._id, function(err, doctor){
        if (err){console.log('Error in finding doctor from JWT'); return;}

        if (doctor){
            return done(null, doctor);
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;

const passport = require('passport');
const config = require('./config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const db = require('../db');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtCheck = new JwtStrategy(jwtOptions, function (payload, done) {
    console.log("payload.sub:", payload.sub);

    db.query("SELECT * FROM users WHERE id = ?", payload.sub, (err, results) => {
        if (err) return done(err, false);
        console.log("query result ok");

        //JWT token expires in 6 months
        if ((payload.iat / 1000 + 60 * 60 * 24 * 30 * 6) >= Date.now()) {
            console.log("jwt expired");
            return done(null, false);
        }
        console.log("jwt not expired");

        if (results) {
            const user = JSON.parse(JSON.stringify(results))[0];
            console.log("user matched with token:", user);
            done(null, user);
        } else {
            console.log("user not matched with token");
            done(null, false);
        }
    });
});

const localOptions = {
    usernameField: 'email'
};

const localSignin = new LocalStrategy(localOptions, function (email, password, done) {
    db.query("SELECT * FROM users WHERE email = ? LIMIT 1", email, (err, results) => {
        if (err) return done(err);
        if (!results) return done(null, false);

        const user = JSON.parse(JSON.stringify(results))[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false);
            return done(null, user);
        });
    });
});

passport.use(jwtCheck);
passport.use(localSignin);
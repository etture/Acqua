const express = require('express');
const passport = require('passport');
const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');

const router = express.Router();

const Entries = require('./routes/entries');
const Users = require('./routes/users');
const Profiles = require('./routes/profiles');
const Auth = require('./routes/auth');

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.use('/entries', Entries);
router.use('/users', Users);
router.use('/profiles', Profiles);
router.use('/auth', Auth);

//TODO: check whether the token is valid
router.post('/token', requireAuth, (req, res) => {
    if(!req.user){
        res.status(401).send({error: 'token expired', valid: "false"});
    }

    res.send({valid: "true"});
});

module.exports = router;
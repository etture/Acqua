const express = require('express');
const passport = require('passport');
const passportService = require('./services/passport');

const router = express.Router();

const Entries = require('./routes/entries');
const Friends = require('./routes/friends');
const Profiles = require('./routes/profiles');
const Auth = require('./routes/auth');

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

router.use('/entries', Entries);
router.use('/friends', Friends);
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
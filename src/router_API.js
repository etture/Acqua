const express = require('express');
const passport = require('passport');
const passportService = require('./services/passport');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

//Routes for each functionality
const Auth = require('./routes/auth');
const Entries = require('./routes/entries');
const Friends = require('./routes/friends');
const Profiles = require('./routes/profiles');

router.use('/auth', Auth);
router.use('/entries', Entries);
router.use('/friends', Friends);
router.use('/profiles', Profiles);

//TODO: check whether the token is valid
router.post('/token', requireAuth, (req, res) => {
    if(!req.user){
        res.status(401).send({error: 'token expired', valid: "false"});
    }

    res.send({valid: "true"});
});

module.exports = router;
const express = require('express');
const passport = require('passport');
const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');

const router = express.Router();

const Entries = require('./routes/entries');
const Users = require('./routes/users');
const Profiles = require('./routes/profiles');

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.use('/entries', Entries);
router.use('/users', Users);
router.use('/profiles', Profiles);

router.post('/signup', Authentication.signup);
router.post('/signin', requireSignin, Authentication.signin);

module.exports = router;
const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const Authentication = require('../controllers/authentication');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.post('/signup', Authentication.signup);

router.get('/signup', (req, res) => {
    res.send('signup page');
});

router.post('/signin', requireSignin, Authentication.signin);

module.exports = router;
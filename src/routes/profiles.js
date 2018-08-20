const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const db = require('../db');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

//Get the basic profile information about user (oneself)
router.get('/basic', requireAuth, (req, res) => {
    const user_id = req.user.id;

    const query_select_user = `SELECT id, last_name, first_name, email, phone_number FROM users WHERE id = ${user_id}`;
    db.query(query_select_user, (err, results) => {
        if (err) {
            res.send(err);
        }
        const basic_profile = JSON.parse(JSON.stringify(results));
        res.json(basic_profile);
    });
});

//Update the basic profile information about user (oneself) except for password
router.put('/basic/update', (req, res) => {
    res.send('update put route');
});

router.get('/profile/:user_id', (req, res) => {

});

router.post('/profile/update', (req, res) => {

});

router.get('/work/:user_id', (req, res) => {

});

router.post('/work/update', (req, res) => {

});

module.exports = router;
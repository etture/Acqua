const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const db = require('../db');
const _ = require('lodash');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

//Get the basic profile information about user (oneself)
router.get('/basic', requireAuth, (req, res) => {
    const user_id = req.user.id;

    const query_select_user = "SELECT id, last_name, first_name, email, phone_number FROM users WHERE id = ?";

    db.query(query_select_user, user_id, (err, results) => {
        if (err) {
            res.send(err);
        }
        const basic_profile = JSON.parse(JSON.stringify(results));
        res.json(basic_profile);
    });
});

//Update the basic profile information about user (oneself) except for password
router.put('/basic/update', requireAuth, (req, res) => {
    const user_id = req.user.id;
    const {last_name, first_name, email, phone_number} = req.body;

    //Object with possible update candidates, whose values may or may not be empty
    const updateCandidates = {last_name, first_name, email, phone_number};

    //Create an object with only items that are not empty, i.e. desired to be updated
    const updateItems = _.pickBy(updateCandidates, (v) => v !== '');

    db.query("UPDATE users SET ? WHERE id = ?", [updateItems, user_id], (err, result) => {
        if (err) return res.send(err);
        res.send({
            isSuccess: true,
            updated: updateItems
        });
    });
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
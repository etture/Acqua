const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const db = require('../db');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const Authentication = require('../controllers/authentication');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

//Get all of a user's profile information at once (oneself)
router.get('/self', requireAuth, (req, res) => {

});

//Get all of a user's profile information at once (third-person)
router.get('/:user_id', requireAuth, (req, res) => {

});

//Get the basic profile information about user (oneself)
router.get('/basic/self', requireAuth, (req, res) => {
    const {id, last_name, first_name, email, phone_number} = req.user;
    console.log('route called');
    res.json({
        id, last_name, first_name, email, phone_number
    });
});

//Get the basic profile information about another user
router.get('/basic/:user_id', requireAuth, (req, res) => {
    const {user_id} = req.params;

    db.query("SELECT * FROM users WHERE id = ? LIMIT 1", user_id, (err, results) => {
        if (err) return res.send(err);
        const user = JSON.parse(JSON.stringify(results))[0];
        const {id, last_name, first_name, email, phone_number} = user;
        res.json({
            id, last_name, first_name, email, phone_number
        });
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
            updatedItems: updateItems
        });
    });
});

//Update user's password
router.put('/basic/update_pw', requireAuth, (req, res) => {
    const user_id = req.user.id;
    const {password} = req.user;
    const {old_password, new_password} = req.body;

    //Check if the provided password matches the password on the DB
    bcrypt.compare(old_password, password, (err, isMatch) => {
        if (err) return res.send(err);
        if (!isMatch) return res.status(401).send({
            isSuccess: false,
            errorMessage: "password does not match"
        });

        //Password matched!
        Authentication.hashPassword(new_password, (err, hash) => {
            if (err) return res.send(err);

            db.query("UPDATE users SET password = ? WHERE id = ?", [hash, user_id], (err, result) => {
                if (err) return res.send(err);
                res.send({
                    isSuccess: true
                });
            });
        });
    });
});

//Return user's public profile information (oneself)
router.get('/profile/self', requireAuth, (req, res) => {

});

//Return user's public profile information (third-person)
router.get('/profile/:user_id', requireAuth, (req, res) => {
    const user_id = req.params.user_id;

    db.query("SELECT * FROM profiles WHERE user_id = ? LIMIT 1", user_id, (err, results) => {
        if (err) return res.send(err);
        const user_profile = JSON.parse(JSON.stringify(results))[0];
        res.json(user_profile);
    });
});

router.post('/profile/update', requireAuth, (req, res) => {

});

//Return user's work history information, sorted by ascending order starting date (oneself)
router.get('/work/self', requireAuth, (req, res) => {

});

//Return user's work history information, sorted by ascending order starting date (third-person)
router.get('/work/:user_id', requireAuth, (req, res) => {

});

router.post('/work/update', requireAuth, (req, res) => {

});


module.exports = router;
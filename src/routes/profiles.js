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
    const user_id = req.user.id;

    const query_select_all_profile_info =
        "SELECT users.id, users.last_name, users.first_name, users.email, users.phone_number, profiles.gender, profiles.birthday, profiles.profile_picture, profiles.high_school, profiles.university_name, profiles.university_major, profiles.graduate_masters_name, profiles.graduate_masters_major, profiles.graduate_phd_name, profiles.graduate_phd_major, profiles.current_work_name, profiles.current_work_position FROM users INNER JOIN profiles ON users.id = profiles.user_id WHERE id = ?";

    db.query(query_select_all_profile_info, user_id, (err, results) => {
        if (err) return res.send(err);
        const complete_profile = JSON.parse(JSON.stringify(results))[0];

        db.query("SELECT * FROM works WHERE user_id = ? ORDER BY start_date DESC", user_id, (err, results) => {
            if(err) return res.send(err);
            const work_history = JSON.parse(JSON.stringify(results));
            res.send({complete_profile, work_history});
        });
    });
});

//Get user's complete profile information at once (third-person)
router.get('/:user_id', requireAuth, (req, res) => {
    const {user_id} = req.params;

    const query_select_all_profile_info =
        "SELECT users.id, users.last_name, users.first_name, users.email, users.phone_number, profiles.gender, profiles.birthday, profiles.profile_picture, profiles.high_school, profiles.university_name, profiles.university_major, profiles.graduate_masters_name, profiles.graduate_masters_major, profiles.graduate_phd_name, profiles.graduate_phd_major, profiles.current_work_name, profiles.current_work_position FROM users INNER JOIN profiles ON users.id = profiles.user_id WHERE id = ?";

    db.query(query_select_all_profile_info, user_id, (err, results) => {
        if (err) return res.send(err);
        const complete_profile = JSON.parse(JSON.stringify(results))[0];

        db.query("SELECT * FROM works WHERE user_id = ? ORDER BY start_date DESC", user_id, (err, results) => {
            if(err) return res.send(err);
            const work_history = JSON.parse(JSON.stringify(results));
            res.send({complete_profile, work_history});
        });
    });
});

//Get the basic profile information about user (oneself)
router.get('/basic/self', requireAuth, (req, res) => {
    const {id, last_name, first_name, email, phone_number} = req.user;
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

    //Create an object with only items that are neither empty nor null, i.e. desired to be updated
    const updateItems = _.pickBy(updateCandidates, (v) => v !== '' && v !== null);

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
    const user_id = req.user.id;

    db.query("SELECT * FROM profiles WHERE user_id = ? LIMIT 1", user_id, (err, results) => {
        if (err) return res.send(err);
        const user_profile = JSON.parse(JSON.stringify(results))[0];
        res.json(user_profile);
    });
});

//Return user's public profile information (third-person)
router.get('/profile/:user_id', requireAuth, (req, res) => {
    const {user_id} = req.params;

    db.query("SELECT * FROM profiles WHERE user_id = ? LIMIT 1", user_id, (err, results) => {
        if (err) return res.send(err);
        const user_profile = JSON.parse(JSON.stringify(results))[0];
        res.json(user_profile);
    });
});

//Update own user's profile information except for current work information
router.put('/profile/update', requireAuth, (req, res) => {
    const user_id = req.user.id;
    const {gender, birthday, profile_picture, high_school, university_name, university_major, graduate_masters_name, graduate_masters_major, graduate_phd_name, graduate_phd_major} = req.body;

    //Object with possible update candidates, whose values may or may not be empty
    const updateCandidates = {gender, birthday, profile_picture, high_school, university_name, university_major, graduate_masters_name, graduate_masters_major, graduate_phd_name, graduate_phd_major};

    //Create an object with only items that are neither empty nor null, i.e. desired to be updated
    const updateItems = _.pickBy(updateCandidates, (v) => v !== '' && v !== null);

    db.query("UPDATE profiles SET ? WHERE user_id = ?", [updateItems, user_id], (err, result) => {
        if (err) return res.send(err);
        console.log('result:', result);
        res.send({
            isSuccess: true,
            updatedItems: updateItems
        });
    });

});

//Return user's work history information, sorted by ascending order starting date (oneself)
router.get('/work/self', requireAuth, (req, res) => {
    const user_id = req.user.id;

    db.query("SELECT * FROM works WHERE user_id = ? ORDER BY start_date DESC", user_id, (err, results) => {
        if (err) return res.send(err);
        const work_history = JSON.parse(JSON.stringify(results));
        res.json(work_history);
    });
});

//Return user's work history information, sorted by ascending order starting date (third-person)
router.get('/work/:user_id', requireAuth, (req, res) => {
    const {user_id} = req.params;

    db.query("SELECT * FROM works WHERE user_id = ? ORDER BY start_date DESC", user_id, (err, results) => {
        if (err) return res.send(err);
        const work_history = JSON.parse(JSON.stringify(results));
        res.json(work_history);
    });
});

//Add an item to user's work history
router.post('/work/add', requireAuth, (req, res) => {

});

//Update one of user's work history items
router.put('/work/update', requireAuth, (req, res) => {

});


module.exports = router;
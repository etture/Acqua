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
        "SELECT users.id, users.last_name, users.first_name, users.email, users.phone_number, profiles.gender, profiles.birthday, profiles.profile_picture, profiles.high_school, profiles.university_name, profiles.university_major, profiles.graduate_masters_name, profiles.graduate_masters_major, profiles.graduate_phd_name, profiles.graduate_phd_major FROM users INNER JOIN profiles ON users.id = profiles.user_id WHERE id = ?";

    db.query(query_select_all_profile_info, user_id, (err, results) => {
        if (err) return res.send(err);
        const complete_profile = JSON.parse(JSON.stringify(results))[0];

        //User is undefined because the user with that ID doesn't exist
        if(!complete_profile){
            return res.status(400).send({
                errorMessage: "user does not exist"
            });
        }

        db.query("SELECT * FROM works WHERE user_id = ? ORDER BY start_date DESC", user_id, (err, results) => {
            if (err) return res.send(err);
            const work_history = JSON.parse(JSON.stringify(results));

            db.query("SELECT * FROM works WHERE user_id = ? AND status = 'current' ORDER BY start_date DESC", user_id, (err, results) => {
                if (err) return res.send(err);
                const current_work = JSON.parse(JSON.stringify(results));

                res.json({complete_profile, work_history, current_work});
            });
        });
    });
});

//Get user's complete profile information at once (third-person)
router.get('/:user_id', requireAuth, (req, res) => {
    const {user_id} = req.params;

    const query_select_all_profile_info =
        "SELECT users.id, users.last_name, users.first_name, users.email, users.phone_number, profiles.gender, profiles.birthday, profiles.profile_picture, profiles.high_school, profiles.university_name, profiles.university_major, profiles.graduate_masters_name, profiles.graduate_masters_major, profiles.graduate_phd_name, profiles.graduate_phd_major FROM users INNER JOIN profiles ON users.id = profiles.user_id WHERE id = ?";

    db.query(query_select_all_profile_info, user_id, (err, results) => {
        if (err) return res.send(err);
        const complete_profile = JSON.parse(JSON.stringify(results))[0];

        //User is undefined because the user with that ID doesn't exist
        if(!complete_profile){
            return res.status(400).send({
                errorMessage: "user does not exist"
            });
        }

        db.query("SELECT * FROM works WHERE user_id = ? ORDER BY start_date DESC", user_id, (err, results) => {
            if (err) return res.send(err);
            const work_history = JSON.parse(JSON.stringify(results));

            db.query("SELECT * FROM works WHERE user_id = ? AND status = 'current' ORDER BY start_date DESC", user_id, (err, results) => {
                if (err) return res.send(err);
                const current_work = JSON.parse(JSON.stringify(results));

                res.json({complete_profile, work_history, current_work});
            });
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

        //User is undefined because the user with that ID doesn't exist
        if(!user){
            return res.status(400).send({
                errorMessage: "user does not exist"
            });
        }

        const {id, last_name, first_name, email, phone_number} = user;
        res.json({
            id, last_name, first_name, email, phone_number
        });
    });
});

//Update the basic profile information about user (oneself) except for password
router.put('/basic/update', requireAuth, (req, res) => {
    const user_id = req.user.id;

    //Create an object with only items that are neither empty nor null, i.e. desired to be updated
    const updateItems = _.mapValues(_.pickBy(req.body, (v) => v.update === true), (v) => v.value);

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

        //User is undefined because the user with that ID doesn't exist
        if(!user_profile){
            return res.status(400).send({
                errorMessage: "user does not exist"
            });
        }

        res.json(user_profile);
    });
});

//Return user's public profile information (third-person)
router.get('/profile/:user_id', requireAuth, (req, res) => {
    const {user_id} = req.params;

    db.query("SELECT * FROM profiles WHERE user_id = ? LIMIT 1", user_id, (err, results) => {
        if (err) return res.send(err);
        const user_profile = JSON.parse(JSON.stringify(results))[0];

        //User is undefined because the user with that ID doesn't exist
        if(!user_profile){
            return res.status(400).send({
                errorMessage: "user does not exist"
            });
        }

        res.json(user_profile);
    });
});

//Update own user's profile information
router.put('/profile/update', requireAuth, (req, res) => {
    const user_id = req.user.id;

    //Create an object with only items that are neither empty nor null, i.e. desired to be updated
    const updateItems = _.mapValues(_.pickBy(req.body, (v) => v.update === true), (v) => v.value);

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

        //User is undefined because the user with that ID doesn't exist
        if(!work_history){
            return res.status(400).send({
                errorMessage: "user does not exist"
            });
        }

        db.query("SELECT * FROM works WHERE user_id = ? AND status = 'current' ORDER BY start_date DESC", user_id, (err, results) => {
            if (err) return res.send(err);
            const current_work = JSON.parse(JSON.stringify(results));

            res.json({work_history, current_work});
        });
    });
});

//Return user's work history information, sorted by ascending order starting date (third-person)
router.get('/work/:user_id', requireAuth, (req, res) => {
    const {user_id} = req.params;

    db.query("SELECT * FROM works WHERE user_id = ? ORDER BY start_date DESC", user_id, (err, results) => {
        if (err) return res.send(err);
        const work_history = JSON.parse(JSON.stringify(results));

        //User is undefined because the user with that ID doesn't exist
        if(!work_history){
            return res.status(400).send({
                errorMessage: "user does not exist"
            });
        }

        db.query("SELECT * FROM works WHERE user_id = ? AND status = 'current' ORDER BY start_date DESC", user_id, (err, results) => {
            if (err) return res.send(err);
            const current_work = JSON.parse(JSON.stringify(results));

            res.json({work_history, current_work});
        });
    });
});

//Add an item to user's work history
router.post('/work/add', requireAuth, (req, res) => {
    const user_id = req.user.id;
    const job = req.body;
    let addItems = job;
    if (job.end_date.ended === true) {
        addItems.end_date = job.end_date.value;
        addItems.status = 'past';
        if (addItems.start_date >= addItems.end_date) {
            return res.status(400).send({
                errorMessage: "start_date cannot be later than end_date"
            });
        }
    } else {
        addItems.end_date = null;
        addItems.status = 'current';
    }

    db.query("INSERT INTO works SET user_id = ?, ?", [user_id, addItems], (err, result) => {
        if (err) return res.send(err);

        res.send({
            isSuccess: true,
            work: {
                id: result.insertId,
                user_id,
                ...addItems
            }
        });
    });
});

//Update one of user's work history items
router.put('/work/update/:item_id', requireAuth, (req, res) => {
    const user_id = req.user.id;
    const {item_id} = req.params;

    //Create an object with only items that are neither empty nor null, i.e. desired to be updated
    const updateItems = _.mapValues(_.pickBy(req.body, (v) => v.update === true), (v) => v.value);

    db.query("SELECT * FROM works WHERE id = ?", item_id, (err, results) => {
        if (err) return res.send(err);

        const work_item = JSON.parse(JSON.stringify(results))[0];

        //user_id is undefined because the work item with that ID doesn't exist
        if(!work_item){
            return res.status(400).send({
                errorMessage: "work item does not exist"
            });
        }

        const {user_id: owner_id, start_date: original_start_date, end_date: original_end_date} = work_item;

        //Confirm that user is accessing his own work item
        if (user_id !== owner_id) {
            return res.status(400).send({
                errorMessage: "cannot modify other user's item"
            });
        }

        //If the end_date property is updated in any way
        if (updateItems.hasOwnProperty('end_date')) {
            const {end_date} = updateItems;

            if (end_date !== null) {
                //If new end_date doesn't match the pattern, then reject the entire request
                if (!/(\d{4})-(\d{2})-(\d{2})/.test(end_date)) {
                    return res.status(400).send({
                        errorMessage: "date must match yyyy-mm-dd"
                    });
                }

                if (updateItems.hasOwnProperty('start_date')) {
                    const {start_date} = updateItems;

                    //If new start_date doesn't match the pattern, then reject the entire request
                    if (!/(\d{4})-(\d{2})-(\d{2})/.test(start_date)) {
                        return res.status(400).send({
                            errorMessage: "date must match yyyy-mm-dd"
                        });
                    }

                    //Checking that new start_date is not later than new end_date
                    if (start_date >= end_date) {
                        return res.status(400).send({
                            errorMessage: "start_date cannot be later than end_date"
                        });
                    }
                } else {
                    //Checking that original start_date is not later than new end_date
                    if (original_start_date >= end_date) {
                        return res.status(400).send({
                            errorMessage: "start_date cannot be later than end_date"
                        });
                    }
                }

                //If original end_date is null and new end_date is not null, then the work has ended and status must change to 'past'
                if (original_end_date === null) {
                    updateItems.status = 'past';
                }
                //If both original and new end_date are valid dates, then leave status as 'past'
            } else {

                //If original end_date is a valid date but new end_date is null, then the work has not ended and is current; status must change to 'current'
                if (original_end_date !== null) {
                    updateItems.status = 'current';
                }
                //If both original and new end_date are null, then leave status as 'current'
            }

            db.query("UPDATE works SET ? WHERE id = ?", [updateItems, item_id], (err, result) => {
                if (err) return res.send(err);
                return res.send({
                    isSuccess: true,
                    work_updated: {
                        id: item_id,
                        user_id,
                        ...updateItems
                    }
                });
            });

        } else {
            //Case where end_date is not updated
            if (updateItems.hasOwnProperty('start_date')) {
                const {start_date} = updateItems;

                //If date doesn't match the pattern, then reject the entire request
                if (!/(\d{4})-(\d{2})-(\d{2})/.test(start_date)) {
                    return res.status(400).send({
                        errorMessage: "date must match yyyy-mm-dd"
                    });
                }

                //Checking whether new start_date is later than original end_date
                if (original_end_date !== null) {
                    if (start_date >= original_end_date) {
                        return res.status(400).send({
                            errorMessage: "start_date cannot be later than end_date"
                        });
                    }
                }

                db.query("UPDATE works SET ? WHERE id = ?", [updateItems, item_id], (err, result) => {
                    if (err) return res.send(err);
                    return res.send({
                        isSuccess: true,
                        work_updated: {
                            id: item_id,
                            user_id,
                            ...updateItems
                        }
                    });
                });
            }
        }

        //Neither start_date nor end_date are updated
        //Run update query if there is at least one item to update
        if (!_.isEmpty(updateItems)) {
            db.query("UPDATE works SET ? WHERE id = ?", [updateItems, item_id], (err, result) => {
                if (err) return res.send(err);
                res.send({
                    isSuccess: true,
                    work_updated: {
                        id: item_id,
                        user_id,
                        ...updateItems
                    }
                });
            });
        } else {
            //No items are updated, but a request has been sent, so give an error message
            res.send({
                errorMessage: 'no item to be updated'
            });
        }
    });
});

module.exports = router;
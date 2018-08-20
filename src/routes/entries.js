const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const db = require('../db');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

//Get list of all comments written by user on friend
router.get('/get/:friend_id', requireAuth, (req, res) => {
    const {friend_id} = req.params;
    const user_id = req.user.id;

    db.query("SELECT * FROM entries WHERE user_id = ? AND friend_id = ?", [user_id, friend_id], (err, results) => {
        if (err) {
            res.send(err);
            console.log('error:', err);
        } else {
            const entries = JSON.parse(JSON.stringify(results));
            res.json(entries);
        }
    });
});

//Post a memo about a friend
router.post('/post/:friend_id', requireAuth, (req, res) => {
    const {friend_id} = req.params;
    const user_id = req.user.id;
    const memo = req.body.memo;

    const inserts = {user_id, friend_id, memo};

    db.query("INSERT INTO entries SET ?", inserts, (err, result) => {
        if (err) {
            res.send(err);
            console.log('error:', err);
        } else {
            res.send({
                isSuccess: true,
                user_id,
                friend_id,
                post_id: result.insertId
            });
            console.log('1 entry inserted');
        }
    });
});

module.exports = router;
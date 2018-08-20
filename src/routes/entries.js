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

    const query_select_entries = `SELECT * FROM entries WHERE user_id = '${user_id}' AND friend_id = '${friend_id}'`;

    db.query(query_select_entries, (err, results) => {
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

    const query_insert_entry = "INSERT INTO entries (user_id, friend_id, memo) VALUES " +
        `('${user_id}', '${friend_id}', '${memo}')`;

    db.query(query_insert_entry, (err, result) => {
        if (err) {
            res.send(err);
            console.log('error:', err);
        } else {
            res.send({
                isSuccess: true,
                reqEndpoint: '/api/entries/post/:friend_id',
                user_id,
                friend_id,
                post_id: result.insertId
            });
            console.log('1 entry inserted');
        }
    });
});

module.exports = router;
const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const mysql = require('mysql');
const db = require('../db');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

router.get('/', (req, res) => {
    res.send('friends route');
});

router.get('/:userID', requireAuth, (req, res) => {
    const {userID} = req.params;

    //Check that userID matches the authorized user's ID
    if (userID !== req.user.id.toString()) {
        return res.status(403).send({error: 'User ID mismatch, access unauthorized'});
    }

    let query_select_friends = "SELECT ??, ??, ??, ?? FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ?";
    const inserts = ['users.last_name', 'users.first_name', 'users.email', 'users.phone_number', 'friends', 'users', 'users.id', 'friends.friend_id', 'user_id', userID];
    query_select_friends = mysql.format(query_select_friends, inserts);

    db.query(query_select_friends, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            const friends = JSON.parse(JSON.stringify(results));
            res.json(friends);
        }
    });
});

module.exports = router;
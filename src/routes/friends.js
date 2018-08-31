const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const db = require('../db');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

//Get the list of all friends of user
router.get('/get', requireAuth, (req, res) => {
    const user_id = req.user.id;

    const query_select_friends = "SELECT friends.friend_id AS id, users.last_name, users.first_name, friends.nickname, users.email, users.phone_number FROM users INNER JOIN friends ON users.id = friends.friend_id WHERE user_id = ?";

    db.query(query_select_friends, [user_id], (err, results) => {
        if (err) {
            res.send(err);
        } else {
            const friends = JSON.parse(JSON.stringify(results));
            res.send({friends_list: friends});
        }
    });
});

//Add a friend for user
router.post('/add', requireAuth, (req, res) => {
    const user_id = req.user.id;
    const friend_id = req.body.friend_id;

    const inserts = {user_id, friend_id};

    db.query("INSERT INTO friends SET ?", inserts, (err, result) => {
        if (err) return res.send(err);
        res.send({
            isSuccess: true,
            friend_id
        });
        console.log('1 friend inserted');
    });
});

//Edit friend's nickname to be displayed to user
router.put('/nickname/:friend_id', requireAuth, (req, res) => {
    const {nickname} = req.body;
    const user_id = req.user.id;
    const {friend_id} = req.params;

    db.query("UPDATE friends SET nickname = ? WHERE user_id = ? AND friend_id = ?", [nickname, user_id, friend_id], (err, result) => {
        if(err) return res.send(err);
        res.send({
            isSuccess: true,
            friend_id,
            nickname
        });
    });
});

module.exports = router;
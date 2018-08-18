const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const mysql = require('mysql');
const db = require('../db');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

router.get('/:userID/:personID', requireAuth, (req, res) => {
    const {userID, personID} = req.params;

    //Check that userID matches the authorized user's ID
    if(userID != req.user.id){
        return res.status(403).send({error: 'User ID mismatch, access unauthorized'});
    }

    let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    const inserts = ['entries', 'user_id', userID, 'person_id', personID];
    query = mysql.format(query, inserts);

    db.query(query, (err, results) => {
        if (err) {
            res.send(err);
            console.log('error:', err);
        } else {
            const resultJson = JSON.parse(JSON.stringify(results));

            res.json(resultJson);
        }
    });
});

router.post('/:userID/:personID', requireAuth, (req, res) => {
    const {userID, personID} = req.params;
    const comment = req.body.comment;

    //Check that userID matches the authorized user's ID
    if(userID != req.user.id){
        return res.status(403).send({error: 'User ID mismatch, access unauthorized'});
    }

    let query = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
    const inserts = ['entries', 'user_id', 'person_id', 'comment', userID, personID, comment];
    query = mysql.format(query, inserts);

    db.query(query, (err, result) => {
        if (err) {
            res.send(err);
            console.log('error:', err);
        } else {
            res.send('1 entry inserted');
            console.log('1 entry inserted');
        }
    });
});

module.exports = router;
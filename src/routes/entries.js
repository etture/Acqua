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
    if (userID !== req.user.id.toString()) {
        return res.status(403).send({error: 'User ID mismatch, access unauthorized'});
    }

    let query_select_entries = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    const inserts = ['entries', 'user_id', userID, 'person_id', personID];
    query_select_entries = mysql.format(query_select_entries, inserts);

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

router.post('/:userID/:personID', requireAuth, (req, res) => {
    const {userID, personID} = req.params;
    const comment = req.body.comment;

    //Check that userID matches the authorized user's ID
    if (userID !== req.user.id) {
        return res.status(403).send({error: 'User ID mismatch, access unauthorized'});
    }

    let query_insert_entry = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
    const inserts = ['entries', 'user_id', 'person_id', 'comment', userID, personID, comment];
    query_insert_entry = mysql.format(query_insert_entry, inserts);

    db.query(query_insert_entry, (err, result) => {
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
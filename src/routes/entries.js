const express = require('express');
const mysql = require('mysql');
const db = require('../db');

const router = express.Router();

router.get('/:userId/:personId', (req, res) => {

    const {userId, personId} = req.params;

    let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    const inserts = ['entries', 'user_id', userId, 'person_id', personId];
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

module.exports = router;
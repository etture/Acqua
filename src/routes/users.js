const express = require('express');
const mysql = require('mysql');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('user route');
});

module.exports = router;
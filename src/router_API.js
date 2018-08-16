const express = require('express');

const router = express.Router();

const Entries = require('./routes/entries');
const Users = require('./routes/users');
const Profiles = require('./routes/profiles');

router.use('/entries', Entries);
router.use('/users', Users);
router.use('/profiles', Profiles);

module.exports = router;
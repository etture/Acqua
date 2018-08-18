const jwt = require('jwt-simple');
const config = require('../services/config');
const bcrypt = require('bcrypt-nodejs');
const mysql = require('mysql');
const db = require('../db');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    let password = req.body.password;
    const name = req.body.name;
    const phone_number = req.body.phone_number;

    //Return an error if either email or password is not entered
    if (!email || !password) {
        return res.status(422).send({error: 'Must provide both email and password'});
    }

    let query_select_user = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1";
    const inserts = ['users', 'email', email];
    query_select_user = mysql.format(query_select_user, inserts);

    //Check to see if an account already exists with that email
    db.query(query_select_user, (err, results) => {
        if (err) {
            return next(err);
        }

        if (results.length > 0) {
            return res.status(422).send({error: 'Email is in use'});
        }

        //If the email is available, create and save the new user
        //Create salt for password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);

            //Hash password
            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) return next(err);

                password = hash;

                let query_signup = "INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)";
                const inserts = ['users', 'email', 'password', 'name', 'phone_number',
                    email, password, name, phone_number];
                query_signup = mysql.format(query_signup, inserts);

                //Insert user into users table
                db.query(query_signup, (err, result) => {
                    if (err) return next(err);

                    //Get the user row to obtain ID to be used to create JWT
                    db.query(query_select_user, (err, results) => {
                        if (err) return next(err);

                        const user = JSON.parse(JSON.stringify(results))[0];

                        res.send({
                            success: 'Successfully signed up',
                            user: {
                                email, password, name, phone_number
                            },
                            token: tokenForUser(user)
                        });
                    });
                });
            });
        });
    });
};

exports.signin = function(req, res, next){
    res.send({
        success: 'Successfully signed in',
        token: tokenForUser(req.user)
    });
};
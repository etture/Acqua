const jwt = require('jwt-simple');
const config = require('../services/config');
const bcrypt = require('bcrypt-nodejs');
const db = require('../db');

function tokenForUser(user_id) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user_id, iat: timestamp}, config.secret);
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    let password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const phone_number = req.body.phone_number;

    //Return an error if either email or password is not entered
    if (!email || !password) {
        return res.status(422).send({error: 'Must provide both email and password'});
    }

    const query_select_user = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;

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

                //Insert user into users table
                db.beginTransaction((err) => {
                    if(err) throw err;

                    const query_signup = "INSERT INTO users (email, password, first_name, last_name, phone_number) VALUES " +
                        `('${email}', '${password}', '${first_name}', '${last_name}', '${phone_number}')`;

                    db.query(query_signup, (err, result) => {
                        if (err) {
                            db.rollback(() => {
                                return next(err);
                            });
                        }

                        //Get the auto-incrementing user_id from the last INSERT
                        const last_id = result.insertId;
                        console.log('last ID:', last_id);

                        //Once the user has been inserted into `users`, create row for `profiles` and `works`
                        db.query('INSERT INTO profiles SET user_id = ?', last_id, (err, result) => {
                            if (err) {
                                db.rollback(() => {
                                    return next(err);
                                });
                            }

                            db.query('INSERT INTO works SET user_id = ?', last_id, (err, result) => {
                                if (err) {
                                    db.rollback(() => {
                                        return next(err);
                                    });
                                }

                                db.commit((err) => {
                                    if (err) {
                                        db.rollback(() => {
                                            return next(err);
                                        });
                                    }
                                    console.log('insert user all complete');

                                    //Create and send JWT using the user_id
                                    res.send({
                                        isSuccess: 'true',
                                        user: {
                                            email, password, first_name, last_name, phone_number
                                        },
                                        token: tokenForUser(last_id)
                                    });
                                });
                            });
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
        token: tokenForUser(req.user.id)
    });
};
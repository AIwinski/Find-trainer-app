const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const validator = require("validator");

const mailer = require("../misc/mailer");
const CONFIG = require("../config/config");

const User = mongoose.model("User");

const ROLES = require("../config/roles");



router.post("/register", (req, res, next) => {
    User.find({
        email: req.body.email
    })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail already exists"
                });
            } else {

                if (!validator.isEmail(req.body.email)) {
                    return res.status(400).json({
                        message: "Invalid email"
                    });
                }
                if (validator.isEmpty(req.body.first_name)) {
                    return res.status(400).json({
                        message: "First name field cannot be empty"
                    });
                }
                if (validator.isEmpty(req.body.last_name)) {
                    return res.status(400).json({
                        message: "Last name field cannot be empty"
                    });
                }
                if (
                    validator.isEmpty(req.body.password) ||
                    req.body.password.length < 6
                ) {
                    return res.status(400).json({
                        message: "Invalid password"
                    });
                }

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            message: "hashing error"
                        });
                    } else {
                        const secretToken = randomstring.generate();
                        let user;

                        const role = req.body.role;

                        if (role === ROLES.PROFESSIONAL) {
                            user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash,
                                account_verification_token: secretToken,
                                is_active: false,
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                registration_date: Date.now(),
                                role: role,
                                city: req.body.city,
                                phone_number: req.body.phone_number,
                                country: "Poland"
                            });
                        } else if (role === ROLES.NORMAL) {
                            user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash,
                                account_verification_token: secretToken,
                                is_active: false,
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                registration_date: Date.now(),
                                role: role,
                                country: "Poland"
                            });
                        } else {
                            return res.status(400).json({
                                message:
                                    "Wrong user type. PROFESSIONAL or NORMAL allowed"
                            });
                        }

                        user.save()
                            .then(result => {
                                const activationLink =
                                    CONFIG.CLIENT_URI +
                                    "/users/verify/" +
                                    secretToken;

                                const html = `
                                        <b>Witaj na stronie massage app</b>
                                        <p>Kliknij w poniższy link aby dokończyć rejestrację!</p>
                                        <a href="http://${activationLink}">Aktywuj moje konto</a>
                                        <hr>`;
                                // Send email
                                mailer
                                    .sendEmail(
                                        CONFIG.APP_EMAIL_ADDRESS,
                                        result.email,
                                        "Dokończ rejestrację",
                                        html
                                    )
                                    .then(r => {
                                        delete result.password;
                                        return res.status(201).json({
                                            message:
                                                "User created successfully. Confirm registration by clicking link that we have sent you on your email",
                                            user: result
                                        });
                                    })
                                    .catch(e => {
                                        return res.status(500).json({
                                            error: e,
                                            message:
                                                "User created successfully but couldnt send email"
                                        });
                                    });
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            });
        });
});

router.get("/verify/:token", (req, res) => {
    User.findOne(
        {
            account_verification_token: req.params.token
        },
        (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                if (user) {
                    user.is_active = true;
                    user.account_verification_token = "";
                    user.save().then(result => {
                        res.status(200).json({
                            message: "Acconunt verification complete"
                        });
                    });
                } else {
                    res.status(404).json({
                        message: "Acconunt verification failed. Token not found"
                    });
                }
            }
        }
    );
});

router.post("/login", (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed1"
                });
            }
            bcrypt.compare(
                req.body.password,
                user.password,
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Auth failed2"
                        });
                    } else {
                        if (result === false) {
                            return res.status(401).json({
                                message: "Auth failed3"
                            });
                        } else {
                            if (user.isActive === false) {
                                return res.status(403).json({
                                    message: "User account is not active"
                                });
                            }
                            const token = jwt.sign(
                                {
                                    user_id: user._id,
                                    user_role: user.role
                                },
                                CONFIG.JWT_KEY, //process.env.JWT_KEY,
                                {
                                    expiresIn: "1d"
                                }
                            );
                            userInfo = {
                                _id: user._id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                avatar: user.avatar,
                                role: user.role
                            };
                            return res.status(200).json({
                                message: "Auth successful",
                                token: token,
                                user: userInfo
                            });
                        }
                    }
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const axios = require('axios');

const User = require('../models/user');

exports.get_users = (req, res) => {
    User.find({}).exec().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.get_user = (req, res) => {
    User.findOne({_id: req.params.id}).exec().then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.users_register = (req, res) => {
    User.find({login: req.body.login}).exec().then(user => {
        if (user.length > 0) {
            return res.status(409).json({
                message: 'Login exists'
            });
        } else {
            User.find({nickname: req.body.nickname}).exec().then(user => {
                if (user.length > 0) {
                    return res.status(409).json({
                        message: 'Nickname exists'
                    });
                } else {
                    if (req.body.googleId) {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            googleId: req.body.googleId,
                            nickname: req.body.nickname
                        });
                        user.save().then(result => {
                            res.status(201).json({status: true, user: result});
                        }).catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                });
                            } else {
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId,
                                    login: req.body.login,
                                    password: hash,
                                    nickname: req.body.nickname
                                });
                                user.save().then(result => {
                                    res.status(201).json({status: true, user: result});
                                }).catch(err => {
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                            }
                        });
                    }
                }
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.users_login = (req, res) => {
    if (req.body.googleId) {
        User.findOne({googleId: req.body.googleId.toString()}).exec().then(user => {
            if (user) {
                res.status(200).json({
                    status: true, user: user
                });
            } else {
                res.status(401).json({
                    message: 'Auth failed'
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    } else {
        User.findOne({login: req.body.login}).exec().then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        res.status(200).json({
                            status: true, user: user
                        });
                    } else {
                        res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                });
            } else {
                res.status(401).json({
                    message: 'Auth failed'
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
};

exports.github_login = (req, res) => {
    axios.post('https://github.com/login/oauth/authorize?client_id=Ov23liZgy8WG8x14pglV', {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => {
        console.log(response);
        res.status(200).json({msg: 'res'});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const axios = require('axios');

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
                        name: req.body.name
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
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.users_login = (req, res) => {
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

};

exports.users_auth = (req, res) => {
    if (req.body.googleId) {
        User.findOne({google: req.body.googleId.toString()}).exec().then(user => {
            if (user) {
                res.status(200).json({
                    status: true, user: user
                });
            } else {
                const newUser = User({
                    _id: new mongoose.Types.ObjectId,
                    name: req.body.name,
                    login: req.body.login,
                    google: req.body.googleId
                });
                newUser.save().then(newUser => {
                    res.status(201).json({
                        status: true, user: newUser
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    } else if (req.body.gitHubId) {
        User.findOne({gitHub: req.body.gitHubId}).exec().then(user => {
            if (user) {
                res.status(200).json({
                    status: true, user: user
                });
            } else {
                User.findOne({name: req.body.name}).exec().then(result => {
                    if (result) {
                        return res.status(409).json({
                            message: 'Name exists'
                        });
                    } else {
                        const newUser = User({
                            _id: new mongoose.Types.ObjectId,
                            name: req.body.name,
                            login: req.body.login,
                            gitHub: req.body.gitHubId
                        });
                        newUser.save().then(newUser => {
                            res.status(201).json({
                                status: true, user: newUser
                            });
                        }).catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
};

exports.github_get_token = (req, res) => {
    const params = '?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret=' + process.env.GITHUB_CLIENT_SECRET + '&code=' + req.query.code;
    axios.post('https://github.com/login/oauth/access_token' + params, {}, {
        headers: {'Accept': 'application/json'}
    }).then(response => {
        res.status(200).json(response.data);
    }).catch(err => {
        res.status(500).json(err);
    });
};

exports.github_get_user_data = (req, res) => {
    axios.get('https://api.github.com/user', {
        headers: {
            'Authorization': 'Bearer ' + req.query.token
        }
    }).then(response => {
        res.status(200).json(response.data);
    }).catch(err => {
        res.status(500).json(err);
    });
};
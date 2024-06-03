const mongoose = require('mongoose');

const Yap = require('../models/yap');
const User = require('../models/user');

exports.get_all_yaps = (req, res) => {
    Yap.find().sort({likes: 'desc'}).populate('victim').exec().then(yaps => {
        yaps = yaps.filter(y => {
            return y.deathTime !== null && y.deathTime > new Date() || y.deathTime === null;
        });
        let mostLikes = yaps.shift();
        yaps.sort((yap1, yap2) => {
            return yap2.deathTime - yap1.deathTime;
        });
        yaps.unshift(mostLikes);
        res.status(200).json(yaps);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.get_yap = (req, res) => {
    Yap.findOne({_id: req.params.id}).populate('victim').exec().then(yap => {
        if (yap) {
            if (yap.deathTime !== null && yap.deathTime > new Date() || yap.deathTime === null) {
                res.status(200).json(yap);
            } else {
                res.status(404).json({message: 'Yap not found'});
            }
        } else {
            res.status(404).json({message: 'Yap not found'});
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.get_victim_yaps = (req, res) => {
    Yap.find({victim: req.params.userId}).sort({likes: 'desc'}).populate('victim').exec().then(yaps => {
        yaps = yaps.filter(y => {
            return y.deathTime !== null && y.deathTime > new Date() || y.deathTime === null;
        });
        res.status(200).json(yaps);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.get_author_yaps = (req, res) => {
    Yap.find({author: req.params.userId}).populate('victim').exec().then(yaps => {
        yaps = yaps.filter(y => {
            return y.deathTime !== null && y.deathTime > new Date() || y.deathTime === null;
        });
        res.status(200).json(yaps);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.get_random_yap = (req, res) => {
    Yap.find({_id: {'$ne': req.params.prevId}}).populate('victim').exec().then(yaps => {
        if (yaps.length > 0) {
            yaps = yaps.filter(y => {
                return y.deathTime > new Date();
            });
            res.status(200).json(yaps[Math.floor(Math.random() * yaps.length)]);
        } else {
            res.status(404).json({message: 'Yaps not found'});
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.create_yap = (req, res) => {
    try {
        console.log(req.body);
        User.findOne({name: req.body.victim}).exec().then(user => {
            if (user) {
                req.body.victim = user._id;
                const yap = new Yap({
                    _id: new mongoose.Types.ObjectId,
                    author: req.body.author,
                    victim: req.body.victim,
                    body: req.body.body,
                    deathTime: req.body.deathTime
                });
                yap.save().then(result => {
                    res.status(201).json({
                        status: true
                    });
                });
            } else {
                res.status(404).json({message: 'Victim not found'});
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};

exports.modify_yap = (req, res) => {
    Yap.updateOne({_id: req.params.id}, {
        $set: {
            body: req.body.body, deathTime: req.body.deathTime
        }
    }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.like_yap = (req, res) => {
    Yap.findOne({_id: req.params.id}).exec().then(yap => {
        if (yap.liked.includes(req.body.userId)) {
            const index = yap.liked.indexOf(req.body.userId);
            yap.liked.splice(index, 1);
            yap.likes--;
        } else {
            yap.liked.push(req.body.userId);
            yap.likes++;
        }
        yap.save().then(async savedDoc => {
            await Yap.populate(savedDoc, 'victim');
            res.status(200).json({yap: savedDoc});
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.delete_yap = (req, res) => {
    Yap.deleteOne({_id: req.params.id}).exec().then(() => {
        res.status(200).json({status: true, message: 'Deleted'});
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};
const mongoose = require('mongoose');

const User = require('../models/user');
const Yap = require('../models/yap');

exports.get_stats = async (req, res) => {
    const totalYaps = await Yap.find({}).exec().then(result => {
        return result.length;
    }).catch(err => {
        return res.status(500).json(err);
    });
    const availableYaps = await Yap.find({}).exec().then(result => {
        result = result.filter(y => {
            return y.deathTime !== null && y.deathTime > new Date() || y.deathTime === null;
        });
        return result.length;
    }).catch(err => {
        return res.status(500).json(err);
    });
    const totalUsers = await User.find({}).exec().then(result => {
        return result.length;
    }).catch(err => {
        return res.status(500).json(err);
    });
    const mostYapped = await Yap.find({}).populate('victim').exec().then(result => {
        const users = new Map();
        result.forEach(yap => {
            if (!users.has(yap.victim._id)) {
                users.set(yap.victim._id, 1);
            } else {
                users.set(yap.victim._id, users.get(yap.victim._id) + 1);
            }
        });
        return result.find(y => {
            return y.victim._id === [...users.entries()].reduce((a, e) => e[1] > a[1] ? e : a)[0];
        }).victim.name;
    }).catch(err => {
        return res.status(500).json(err);
    });
    const mostLikes = await Yap.find({}).exec().then(result => {
        let likes = 0;
        result.forEach(yap => {
            if (yap.likes > likes) {
                likes = yap.likes;
            }
        });
        return likes;
    }).catch(err => {
        return res.status(500).json(err);
    });
    res.status(200).json([
        {name: 'Total yaps', value: totalYaps},
        {name: 'Available Yaps', value: availableYaps},
        {name: 'Total Users', value: totalUsers},
        {name: 'Most Yapped', value: mostYapped},
        {name: 'Most likes on yap', value: mostLikes}
    ]);
};

exports.get_user_stats = async (req, res) => {
    const totalYaps = await Yap.find({author: req.params.id}).exec().then(result => {
        return result.length;
    }).catch(err => {
        return res.status(500).json(err);
    });
    const availableYaps = await Yap.find({author: req.params.id}).exec().then(result => {
        result = result.filter(y => {
            return y.deathTime !== null && y.deathTime > new Date() || y.deathTime === null;
        });
        return result.length;
    }).catch(err => {
        return res.status(500).json(err);
    });
    const mostLikes = await Yap.find({author: req.params.id}).exec().then(result => {
        let likes = 0;
        result.forEach(yap => {
            if (yap.likes > likes) {
                likes = yap.likes;
            }
        });
        return likes;
    }).catch(err => {
        return res.status(500).json(err);
    });
    res.status(200).json([
        {name: 'Total yaps', value: totalYaps},
        {name: 'Available Yaps', value: availableYaps},
        {name: 'Most likes', value: mostLikes}
    ]);
};
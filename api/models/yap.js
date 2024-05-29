const mongoose = require('mongoose');

const yapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }, victim: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }, body: {
        type: String, required: true
    }, deathTime: Date,
    likes: {type: Number, default: 0},
    liked: {type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: []}
});

module.exports = mongoose.model('Yap', yapSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, login: {
        type: String, required: false, unique: true
    }, password: {
        type: String, required: false
    }, name: {
        type: String, required: true
    }, google: {
        type: String, required: false
    }, gitHub: {
        type: String, required: false
    }
});

module.exports = mongoose.model('User', userSchema);
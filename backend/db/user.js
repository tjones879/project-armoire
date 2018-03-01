var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    hash: String
});

module.exports = mongoose.model('User', UserSchema);

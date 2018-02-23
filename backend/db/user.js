var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    email: String,
    hash: String
});

module.exports = mongoose.model('User', UserSchema);

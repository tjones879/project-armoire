var mongoose = require('mongoose');

var AuthenticationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    hash: String,
    salt: String
});

module.exports = mongoose.model('Authentication', AuthenticationSchema);

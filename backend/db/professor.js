var mongoose = require('mongoose');

var ProfessorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    fname: String,
    lname: String,
    courses: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Professor', ProfessorSchema);

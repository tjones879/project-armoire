var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    crn: String,
    assignments: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Course', CourseSchema);

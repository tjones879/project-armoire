var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        index: true
    },
    open_date: Date,
    close_date: Date,
    description: String,
    requirements: String,
    examples: [String]
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
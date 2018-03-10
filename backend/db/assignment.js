var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        index: true
    },
    title: String,
    open_date: Date,
    close_date: Date,
    description: String,
    requirements: String,
    examples: [String]
});

module.exports = mongoose.model('Assignment', AssignmentSchema);

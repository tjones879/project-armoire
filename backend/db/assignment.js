var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        index: true
    },
    language: String,
    title: String,
    open_date: Date,
    close_date: Date,
    description: String,
    requirements: String,
    examples: [
        {input: String, output: String}
    ],
    tests: [
        {id: Number, label: String, action: String, visible: Boolean}
    ]
});

module.exports = mongoose.model('Assignment', AssignmentSchema);

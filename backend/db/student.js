var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authentication',
        index: true
    },
    fname: String,
    lname: String,
    courses: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            index: true
        },
        assignments: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Assignment',
                index: true
            },
            submissions: [{
                _id: mongoose.Schema.Types.ObjectId,
                contents: String,
                tests: [{
                    id: Number,
                    output: String
                }]
            }]
        }]
    }]
});

module.exports = mongoose.model('Student', StudentSchema);

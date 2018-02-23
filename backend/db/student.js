var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    login_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // TODO: Store name in user db file
        index: true
    },
    fname: String,
    lname: String,
    courses: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course' // TODO: Store name in user db file
        },
        assignments: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Assignment' // TODO: Store name in user db file
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

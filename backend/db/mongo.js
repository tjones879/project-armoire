var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    var course = require('./course');
    var user = require('./user');
    var professor = require('./professor');
    var student = require('./student');
    var assignment = require('./assignment');
});

db.on('error', console.error.bind(console, 'database failed to connect'));

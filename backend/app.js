var mongo = require('./db/mongo');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var assignment = require('./routes/assignment');
var professor = require('./routes/professor');
var course = require('./routes/course');
var student = require('./routes/student');
var authentication = require('./routes/authentication');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', index);
app.use('/assignment', assignment);
app.use('/professor', professor);
app.use('/course', course);
app.use('/student', student);
app.use('/authentication', authentication);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function() {
    console.log("Node app is running on localhost:", app.get('port'))
});

module.exports = app;

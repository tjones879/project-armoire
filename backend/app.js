require('dotenv').config();
var mongo = require('./db/mongo');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var assignment = require('./routes/assignment');
var submission = require('./routes/submission');
var professor = require('./routes/professor');
var course = require('./routes/course');
var student = require('./routes/student');
var authentication = require('./routes/authentication');
const jwt = require('jsonwebtoken');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', index);
app.use('/api/v1/authentication', authentication);

//This needs to go before '.use'
app.post('/api/v1/course', verifyToken, course);

app.use('/api/v1/assignment', assignment);
//app.post('/submission', verifyToken, submission);
app.use('/api/v1/submission', submission);
app.use('/api/v1/professor', professor);
app.use('/api/v1/course', course);
app.use('/api/v1/student', student);

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

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
    //res.render('error');
    console.log(`Error Status: ${err.status}\nError Message: ${err.message} \nRequest Endpoint: ${req.url}\nFrom: ${req.headers.referer}`);
    res.send(err);
});

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function() {
    console.log("Node app is running on localhost:", app.get('port'))
});

module.exports = app;

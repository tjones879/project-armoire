require('dotenv').config();
var mongo = require('./db/mongo');
var express = require('express');
var fs = require('fs');
var path = require('path');
var https = require('https');
var http = require('http');
var bodyParser = require('body-parser');
var assignment = require('./routes/assignment');
var submission = require('./routes/submission');
var professor = require('./routes/professor');
var course = require('./routes/course');
var student = require('./routes/student');
var authentication = require('./routes/authentication');
const jwt = require('jsonwebtoken');

var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./client-cert.pem')
};

var app = express();

app.all('*', (req, res, next) => {
    if (req.secure)
        return next();

    res.redirect('https://' + req.hostname + req.url);
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.use('/authentication', authentication);

//This needs to go before '.use'
app.post('/course', verifyToken, course);

app.use('/assignment', assignment);
//app.post('/submission', verifyToken, submission);
app.use('/submission', submission);
app.use('/professor', professor);
app.use('/course', course);
app.use('/student', student);

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

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

module.exports = app;

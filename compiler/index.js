var express = require('express');
var http = require('http');
var arr = require('./compilers');
var Compiler = require('./dockerCompiler');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);
var port=8080;


var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); 
var bruteforce = new ExpressBrute(store,{
    freeRetries: 50,
    lifetime: 3600
});

app.use(express.static(__dirname));
app.use(bodyParser());

app.all('*', function(req, res, next) 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function random(size) {
    return require("crypto").randomBytes(size).toString('hex');
}


app.post('/compile', bruteforce.prevent, (req, res) =>
{
    var folder = 'temp/' + random(10);
    var path = __dirname + "/";
    var vm_name = 'virtual_machine';
    var timeout_value = 60; //seconds
    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;

    var dockerCompiler = new Compiler(
        timeout_value, path, folder, vm_name, arr.compilerArray[language][0],
        arr.compilerArray[language][1], code, arr.compilerArray[language][2],
        arr.compilerArray[language][3], arr.compilerArray[language][4], stdin);


    dockerCompiler.run((data,exec_time,err) => {
        res.send({
            output: data,
            langid: language,
            code: code,
            errors: err,
            time: exec_time});
    });
});


app.get('/', (req, res) => {
    res.sendfile("./index.html");
});

console.log("Listening at " + port)
server.listen(port);

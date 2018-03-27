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
    let language = req.body.language;
    let code = req.body.code;

    let payload = {
        timeout_value:   1, //seconds
        path:            __dirname + "/",
        folder:          'temp/' + random(10),
        vm_name:         'virtual_machine',
        compiler_name:   arr.compilerArray[language][0],
        file_name:       arr.compilerArray[language][1],
        code:            code,
        output_command:  arr.compilerArray[language][2],
        langName:        arr.compilerArray[language][3],
        extra_arguments: arr.compilerArray[language][4],
        stdin_data:      req.body.stdin,
    };

    var dockerCompiler = new Compiler(payload);

    dockerCompiler.run((data, exec_time, err) => {
        res.send({
            output: data,
            langid: language,
            code: code,
            errors: err,
            time: exec_time
        });
    });
});


app.get('/', (req, res) => {
    res.sendfile("./index.html");
});

console.log("Listening at " + port)
server.listen(port);

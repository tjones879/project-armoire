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
        timeout_value:   10000, // ms
        path:            __dirname + "/",
        folder:          'temp/' + random(10),
        vm_name:         'virtual_machine',
        compiler_name:   arr.compilers[language].compiler_cmd,
        file_name:       arr.compilers[language].source_file,
        code:            code,
        output_command:  arr.compilers[language].compiled_exe,
        langName:        arr.compilers[language].langName,
        extra_arguments: arr.compilers[language].extra_args,
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

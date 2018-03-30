var DockerSandbox = function(payload) {
    this.timeout_value   = payload.timeout_value;
    this.path            = payload.path;
    this.folder          = payload.folder;
    this.vm_name         = payload.vm_name;
    this.compiler_name   = payload.compiler_name;
    this.file_name       = payload.file_name;
    this.code            = payload.code;
    this.output_command  = payload.output_command;
    this.langName        = payload.langName;
    this.extra_arguments = payload.extra_arguments;
    this.stdin_data      = payload.stdin_data;
}

DockerSandbox.prototype.run = function(callback) {
    let sandbox = this;
    this.prepare(() => sandbox.execute(callback));
}

function buildPrepCmd(path, folder) {
    let dir = path + folder;
    let command = "mkdir " + dir;
    command += " && cp " + path + "/DockerPayload/* " + dir;
    command += " && chmod 777 " + dir;
    return command;
}

DockerSandbox.prototype.prepare = function(callback) {
    var exec = require('child_process').exec;
    var fs = require('fs');
    var sandbox = this;
    let command = buildPrepCmd(this.path, this.folder);

    exec(command, (st) => {
        fs.writeFile(sandbox.path + sandbox.folder + "/" + sandbox.file_name, sandbox.code, (err) => {
            if (err) {
                console.log("Error in writing code: " + err);
            } else {
                console.log(sandbox.langName + " file was saved!");
                exec("chmod 777 \'" + sandbox.path + sandbox.folder + "/" + sandbox.file_name + "\'");

                fs.writeFile(sandbox.path + sandbox.folder + "/inputFile", sandbox.stdin_data, (err) => {
                    if (err) {
                        console.log("Error in writing input: " + err);
                    } else {
                        console.log("Input file was saved!");
                        callback();
                    }
                });
            }
        });
    });
}

function buildDockerCmd(path, vmName, compiler, srcFile, outputCommand, extraArgs) {
    let command = 'sudo docker run --rm -v ';
    command += '"' + path + '":/codeDir ';
    command += vmName + ' /codeDir/script.py ';
    command += compiler + ' "' + srcFile + '" "' + outputCommand + '" "' + extraArgs + '"';
    return command;
}

DockerSandbox.prototype.execute = function(callback) {
    var exec = require('child_process').exec;
    var fs = require('fs');
    var timer = 0; //variable to enforce the timeout_value
    var sandbox = this;

    var st = buildDockerCmd(this.path + this.folder, this.vm_name,
                            this.compiler_name, this.file_name,
                            this.output_command, this.extra_arguments);
    console.log("Executing script: `" + st + "`");

    let defaults = {
        encoding: 'utf8',
        timeout: this.timeout_value,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
    };

    let dockerPID = exec(st, defaults, (err, stdout, stdin) => {
        if (err) {
            console.log("Compilation timed out.");
            console.log(err);
            let data = "\nExecution Timed Out";
            callback(data, defaults.timeout, "");
        } else {
            fs.readFile(sandbox.path + sandbox.folder + '/completed', 'utf8', (err, data) => {
                if (!err) {
                    // The compiler must have finished if the file exists.
                    console.log("DONE");
                    fs.readFile(sandbox.path + sandbox.folder + '/errors', 'utf8', (err2, data2) => {
                        if (!data2)
                            data2 = "";

                        console.log("Error file: ");
                        console.log(data2);

                        console.log("Main File");
                        console.log(data);

                        let lines = data.toString().split('COMPILER END');
                        data = lines[0];
                        let time = lines[1];

                        console.log("Time: ");
                        console.log(time);

                        callback(data,time,data2);
                    });
                }
            });
        }
        exec("rm -r " + sandbox.folder);
    });
}

module.exports = DockerSandbox;

var DockerSandbox = function(payload) {
    this.timeout_value   = payload.timeout_value;
    this.path            = payload.path;
    this.folder          = payload.folder;
    this.vm_name         = payload.vm_name;
    this.language        = payload.language; // This is some kind of compiler struct
    this.src_file        = this.language.src_file;
    this.code            = payload.code;
    this.stdin_data      = payload.stdin_data;
};

DockerSandbox.prototype.run = function(callback) {
    let sandbox = this;
    this.prepare(() => sandbox.execute(callback));
};

function buildPrepCmd(path, folder) {
    let dir = path + folder;
    let command = "mkdir " + dir;
    command += " && cp " + path + "/DockerPayload/* " + dir;
    command += " && chmod 777 " + dir;
    return command;
}

function writePayload(sandbox, language, input) {
    var fs = require('fs');
    let obj = {
        student: '5abe77993265b46e26b60584',
        course: '5abfb80ed9d4c95527672eb9',
        assignment: '5abfb80ed9d4c95527672eba',
        source: language.src_file,
        compile: {
            command: language.compile_cmd
        },
        run: {
            command: language.run_cmd,
            stdin: input,
        }
    };

    fs.writeFile(sandbox.path + sandbox.folder + "/payload", JSON.stringify(obj), (err) => {
        if (err)
            console.log(err);
    });
}

DockerSandbox.prototype.prepare = function(callback) {
    var exec = require('child_process').exec;
    var fs = require('fs');
    var sandbox = this;
    let command = buildPrepCmd(this.path, this.folder);

    exec(command, () => {
        fs.writeFile(sandbox.path + sandbox.folder + "/" + sandbox.src_file, sandbox.code, (err) => {
            if (err) {
                console.log("Error in writing code: " + err);
            } else {
                console.log(sandbox.language.name + " file was saved!");
                exec("chmod 777 '" + sandbox.path + sandbox.folder + "/" + sandbox.src_file + "'");
                writePayload(sandbox, sandbox.language, sandbox.stdin_data);

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
};

function buildDockerCmd(path, vmName) {
    let command = 'sudo docker run --rm --net="host" -v ';
    command += '"' + path + '":/codeDir ';
    command += vmName + ' /codeDir/script.py ';
    return command;
}

DockerSandbox.prototype.execute = function(callback) {
    var exec = require('child_process').exec;
    var fs = require('fs');
    var sandbox = this;

    var st = buildDockerCmd(this.path + this.folder, this.vm_name);
    console.log("Executing script: `" + st + "`");

    let defaults = {
        encoding: 'utf8',
        timeout: this.timeout_value,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
    };

    exec(st, defaults, (err) => {
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
};

module.exports = DockerSandbox;

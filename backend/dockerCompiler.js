var DockerSandbox = function(payload) {
    this.timeout_value   = payload.timeout_value;
    this.path            = payload.path;
    this.folder          = payload.folder;
    this.vm_name         = payload.vm_name;
    this.language        = payload.language; // This is some kind of compiler struct
    this.src_file        = this.language.src_file;
    this.code            = payload.code;
    this.stdin_data      = payload.stdin_data;
    this.student         = payload.student;
    this.course          = payload.course;
    this.assignment      = payload.assignment;
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
        student: sandbox.student,
        course: sandbox.course,
        assignment: sandbox.assignment,
        source: language.src_file,
        compile: {
            command: language.compile_cmd
        },
        run: {
            command: language.run_cmd,
            stdin: input,
        },
        test: language.test
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
                exec("chmod 777 '" + sandbox.path + sandbox.folder + "/" + sandbox.src_file + "'");
                writePayload(sandbox, sandbox.language, sandbox.stdin_data);

                fs.writeFile(sandbox.path + sandbox.folder + "/inputFile", sandbox.stdin_data, (err) => {
                    if (err) {
                        console.log("Error in writing input: " + err);
                    } else {
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
    var sandbox = this;

    var st = buildDockerCmd(this.path + this.folder, this.vm_name);

    let defaults = {
        encoding: 'utf8',
        timeout: this.timeout_value,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
    };

    exec(st, defaults, (err) => {
        exec("rm -r " + sandbox.path + sandbox.folder);
        if (err) {
            console.log("Compilation timed out.");
            console.log(err);
            let data = "\nExecution Timed Out";
            callback(err, data);
        } else {
            callback(err, "");
        }
    });
};

module.exports = DockerSandbox;

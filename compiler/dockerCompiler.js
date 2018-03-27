var DockerSandbox = function(payload)
{
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

DockerSandbox.prototype.run = function(success)
{
    var sandbox = this;

    this.prepare(() => {
        console.log(sandbox);
        sandbox.execute(success);
    });
}

DockerSandbox.prototype.prepare = function(success)
{
    var exec = require('child_process').exec;
    var fs = require('fs');
    var sandbox = this;
    let command = "mkdir " + this.path + this.folder
    command += " && cp " + this.path + "/DockerPayload/* " + this.path + this.folder
    command += " && chmod 777 " + this.path + this.folder;

    exec(command, (st) => {
        fs.writeFile(sandbox.path + sandbox.folder + "/" + sandbox.file_name, sandbox.code, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(sandbox.langName + " file was saved!");
                exec("chmod 777 \'" + sandbox.path + sandbox.folder + "/" + sandbox.file_name + "\'");

                fs.writeFile(sandbox.path + sandbox.folder + "/inputFile", sandbox.stdin_data, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Input file was saved!");
                        success();
                    }
                });
            }
        });
    });
}

DockerSandbox.prototype.execute = function(success)
{
    var exec = require('child_process').exec;
    var fs = require('fs');
    var timer = 0; //variable to enforce the timeout_value
    var sandbox = this;

    var st = this.path + 'dockerRun.sh ' + this.timeout_value + 's -u mysql -e \'NODE_PATH=/usr/local/lib/node_modules\' -i -t -v  "' + this.path + this.folder + '":/codeDir ' + this.vm_name + ' /codeDir/script.sh ' + this.compiler_name + ' ' + this.file_name + ' ' + this.output_command+ ' ' + this.extra_arguments;
    console.log(st);

    exec(st);
    console.log("*************************")
    var intid = setInterval(() => {
        timer = timer + 1;

        fs.readFile(sandbox.path + sandbox.folder + '/completed', 'utf8', (err, data) => {
            if (err && timer < sandbox.timeout_value) {
                return;
            } else if (timer < sandbox.timeout_value) {
                console.log("DONE")
                fs.readFile(sandbox.path + sandbox.folder + '/errors', 'utf8', (err2, data2) => {
                    if(!data2)
                        data2 = "";

                    console.log("Error file: ")
                    console.log(data2)

                    console.log("Main File")
                    console.log(data)

                    var lines = data.toString().split('COMPILER END')
                    data=lines[0]
                    var time=lines[1]

                    console.log("Time: ")
                    console.log(time)

                    success(data,time,data2)
                });
            } else {
                fs.readFile(sandbox.path + sandbox.folder + '/logfile.txt', 'utf8', (err, data) => {
                    if (!data)
                        data = "";

                    data += "\nExecution Timed Out";
                    console.log("Timed Out: " + sandbox.folder + " " + sandbox.langName);
                    fs.readFile(sandbox.path + sandbox.folder + '/errors', 'utf8', (err2, data2) => {
                        if(!data2)
                            data2 = "";

                        var lines = data.toString().split('*---*');
                        data = lines[0];
                        var time = lines[1];

                        console.log("Time: ");
                        console.log(time);

                        success(data,data2)
                    });
                });
            }

            console.log("Removing temp folder: " + sandbox.folder);
            console.log("*************************");
            exec("rm -r " + sandbox.folder);

            clearInterval(intid);
        });
    }, 1000);
}

module.exports = DockerSandbox;

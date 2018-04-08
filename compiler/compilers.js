module.exports.compilers = [
    {
        compile_cmd: "",
        src_file: "file.py",
        run_cmd: "python3 file.py",
        name: "Python 3",
    },
    {
        src_file: "file.cpp",
        compile_cmd: "g++ file.cpp -o /codeDir/a.out ",
        run_cmd: "./a.out",
        name: "C++",
    },
    {
        compile_cmd: "",
        src_file: "file.py",
        run_cmd: "python file.py",
        name: "Python 2",
    }
];

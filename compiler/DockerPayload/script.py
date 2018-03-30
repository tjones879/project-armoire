#!/usr/bin/env python3
import subprocess
import sys
import time


class Arguments():
    def __init__(self, compiler, src_file, output, extra_args):
        self.compiler = compiler
        self.src_file = src_file
        self.output = output
        self.extra_args = extra_args


def getArgs() -> Arguments:
    if len(sys.argv) < 5:
        print("Not enough arguments have been passed in")
    else:
        compiler = sys.argv[1]
        src_file = sys.argv[2]
        output = sys.argv[3]
        extra_args = sys.argv[4]
        return Arguments(compiler, src_file, output, extra_args)


def callCompiler(args: Arguments):
    with open('/codeDir/completed', 'w') as stdout:
        sys.stdout = stdout
        with open('/codeDir/errors', 'w') as stderr:
            sys.stderr = stderr
            start = time.time()
            cmd = [args.compiler, '/codeDir/' + args.src_file]
            if args.output == '':
                with open('/codeDir/inputFile', 'r') as f:
                    subprocess.call(cmd, stdin=f, stdout=stdout, stderr=stderr)
            else:
                result = subprocess.call([cmd, args.extra_args], stdout=stdout, stderr=stderr)
                if result is 0:
                    with open('/codeDir/inputFile', 'r') as f:
                        subprocess.call(args.output, stdout=stdout, stderr=stderr)
                else:
                    print("Compiler Failed")
            print("COMPILER END" + " " + str(time.time() - start))
            sys.stderr = sys.__stderr__
        sys.stdout = sys.__stdout__


if __name__ == '__main__':
    args = getArgs()
    callCompiler(args)

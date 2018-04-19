#!/usr/bin/env python3
from bson import ObjectId
import json
from pymongo import MongoClient, collection
import subprocess
import time
import xunitparser


class Submission():
    """
    Submissions are embedded in each student with the following schema:
    {
        _id: ObjectId,
        contents: String,
        output: String,
        tests: [{
            id: Integer,
            output: String,
        }]
        time: Float
    }
    """
    def __init__(self, contents, output, test_results=[], run_time=0):
        self.contents = contents
        self.output = output
        self.test_results = test_results
        self.run_time = run_time


class Student():
    def __init__(self, db: collection, student_id: ObjectId):
        self.students = db['students']
        self.student_id = student_id
        self.student = self.students.find_one({'_id': student_id})

    def getIndices(self, cid: ObjectId, aid: ObjectId) -> (int, int):
        """
        Mongo does not allow updates to nested array objects.

        We must find the correct array position for both the
        course and the assignment.

        Returns (course index, assignment index) an index will
        be -1 if it could not be found.
        """
        for c, course in enumerate(self.student['courses']):
            if course['id'] == cid:
                for a, assignment in enumerate(course['assignments']):
                    if assignment['id'] == aid:
                        return (c, a)
                return (c, -1)
        return (-1, -1)

    def addAssignment(self, cid: ObjectId, aid: ObjectId) -> bool:
        c, a = self.getIndices(cid, aid)
        if c == -1:
            return False
        if a == -1:
            self.students.update_one(
                {'_id': self.student_id},
                {'$push': {
                    'courses.' + str(c) + '.assignments': {
                        'id': aid,
                        'submissions': []
                    }
                }}
            )
            self.student = self.students.find_one({'_id': self.student_id})

    def saveSubmission(self, cid: ObjectId, aid: ObjectId, sub: 'Submission'):
        self.addAssignment(cid, aid)
        cid, aid = self.getIndices(cid, aid)
        self.students.update_one(
            {'_id': self.student_id},
            {'$push': {
                'courses.' + str(cid) + '.assignments.' + str(aid) + '.submissions': {
                    '_id': ObjectId(),
                    'contents': sub.contents,
                    'output': sub.output,
                    'test_results': sub.test_results,
                    'time': sub.run_time
                }
            }}
        )


def getConfig() -> dict:
    with open('/codeDir/payload', 'r') as payload:
        settings = json.load(payload)
        return settings


def getMongoDomain() -> str:
    """
    Attempt to find the mongo domain.

    Some versions of docker for mac do not properly bridge the host to
    guest containers using localhost. These containers must interact
    with docker.for.mac.localhost instead of localhost.
    """
    systems = ['mac', 'win']
    for s in systems:
        domain = 'docker.for.' + s + '.localhost'
        if subprocess.call(['getent', 'hosts', domain]) == 0:
            return domain
    return 'localhost'


def getMongoHandle(host, port=27017):
    client = MongoClient(host, port)
    db = client['development']
    return db


def getContents(source):
    with open(source, 'r') as f:
        return f.read()


def callCompiler(db: collection, args: dict, contents: str):
    if 'compile' in args and args['compile'] is not None:
        start = time.time()
        p = subprocess.Popen(args['compile']['command'], shell=True,
                             cwd='/codeDir/', stderr=subprocess.PIPE)
        out, err = p.communicate()
        elapsed = time.time() - start
        if err is not None and err != b'':
            return Submission(contents,
                              out.decode('utf-8') + err.decode('utf-8'),
                              run_time=elapsed)
    return None


def runCode(db: collection, args: dict, contents: str):
    with open('/codeDir/inputFile', 'r') as f:
        start = time.time()
        p = subprocess.Popen(args['run']['command'], shell=True, stdin=f,
                             cwd='/codeDir/',
                             stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE)
        out, err = p.communicate()
        elapsed = time.time() - start
        if err is not None and err != b'':
            return Submission(contents,
                              out.decode('utf-8') + err.decode('utf-8'),
                              run_time=elapsed)
        else:
            return Submission(contents, out.decode('utf-8'),
                              run_time=elapsed)


def writeTestFile(file_args: dict, tests: list):
    with open(file_args['name'], 'w') as f:
        f.write(file_args['header'])
        for test in tests:
            f.write(test['action'])
        f.write(file_args['footer'])


def runTests(commands: list) -> str:
    for command in commands:
        p = subprocess.Popen(command, shell=True, cwd='/codeDir/')
        out, err = p.communicate()
        if err is not None and err != b'':
            return err.decode('utf-8')
    if out is not None:
        print(out.decode('utf-8'))
        return out.decode('utf-8')
    else:
        return None


def parseResults(results: str) -> list:
    failures = []
    if results is not None:
        tc, tr = xunitparser.parse(results)
        for t in tr.failures:
            label = t[0]
            failures.append(int(label[:label.find('.')]))
    return failures


def test(db: collection, args: dict):
    test_data = []
    t = args['test']

    writeTestFile(t['language']['file'], t['tests'])
    results = runTests(t['language']['commands'])
    failures = parseResults(results)

    for x in range(len(t['tests'])):
        if x + 1 in failures:
            test_data.append({'id': x + 1, 'state': 'fail'})
        else:
            test_data.append({'id': x + 1, 'state': 'pass'})
    return test_data


def execute(db: collection, args: dict):
    contents = getContents('/codeDir/' + args['source'])
    sub = callCompiler(db, args, contents)
    if sub is not None:
        return sub

    sub = runCode(db, args, contents)
    test_results = test(db, args)
    sub.test_results = test_results
    return sub


if __name__ == '__main__':
    db = getMongoHandle(getMongoDomain())
    config = getConfig()
    student = Student(db, ObjectId(config['student']))
    sub = execute(db, config)
    student.saveSubmission(ObjectId(config['course']),
                           ObjectId(config['assignment']),
                           sub)

#!/usr/bin/env python3
from bson import ObjectId
import json
from pymongo import MongoClient
import pymongo
import subprocess


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
    def __init__(self, db: pymongo.collection, student_id: ObjectId):
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

    def saveSubmission(self, cid: int, aid: int, sub: 'Submission'):
        self.students.update_one(
            {'_id': self.student_id},
            {'$push': {
                'courses.' + str(cid) + '.assignments.' + str(aid) + '.submissions': {
                    'id': ObjectId(),
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


def getMongo(host='localhost', port=27017) -> pymongo.collection:
    client = MongoClient(host, port)
    db = client['development']
    return db


def getContents(source):
    with open(source, 'r') as f:
        return f.read()


def callCompiler(db: pymongo.collection, args: dict):
    contents = getContents('/codeDir/' + args['source'])
    if 'compile' in args and args['compile'] is not None:
        p = subprocess.Popen(args['compile']['command'], shell=True,
                             cwd='/codeDir/', stderr=subprocess.PIPE)
        out, err = p.communicate()
        if err != b'':
            return Submission(contents,
                              out.decode('utf-8') + err.decode('utf-8'))

    with open('/codeDir/inputFile', 'r') as f:
        p = subprocess.Popen(args['run']['command'], shell=True, stdin=f,
                             cwd='/codeDir/',
                             stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE)
        out, err = p.communicate()
        if err != b'':
            return Submission(contents,
                              out.decode('utf-8') + err.decode('utf-8'))
        else:
            return Submission(contents, out.decode('utf-8'))


if __name__ == '__main__':
    db = getMongo()
    config = getConfig()
    student = Student(db, ObjectId(config['student']))
    sub = callCompiler(db, config)
    course, assignment = student.getIndices(ObjectId(config['course']),
                                            ObjectId(config['assignment']))
    student.saveSubmission(course, assignment, sub)

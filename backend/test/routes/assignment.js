let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let expect = chai.expect;
let Assignment = require('../../db/assignment.js');

chai.use(chaiHttp);

describe('Assignments', () => {
    beforeEach(() => {
        Assignment.remove({});
    });

    describe('/GET Assignment', () => {
        it('should return all assignments', () => {
            return chai.request(server)
                .get('/assignment')
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('array');
                });
        });
    });

    describe('/GET/:id Assignment', () => {
        it('should GET an assignment by the given id', () => {
            let assignment = new Assignment({
                name: 'Project Name',
                openDate: new Date(),
                closeDate: new Date(),
                description: 'Description text',
                requirements: 'Requirements text'
            });

            return assignment.save((err, assignment) => {
                chai.request(server)
                    .get('/assignment/' + assignment._id)
                    .then((res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body._id).to.be.equal(assignment._id.toString());
                    });
            });
        });
    });

    describe('/POST Assignment', () => {
        it('should POST an assignment', () => {
            let assignment = {
                name: 'Project Name',
                openDate: new Date(),
                closeDate: new Date(),
                description: 'Description text',
                requirements: 'Requirements text'
            };

            return chai.request(server)
                .post('/assignment')
                .send(assignment)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body._id).to.not.be.null;
                    expect(res.body._id).to.not.be.undefined;
                });
        });
    });
});

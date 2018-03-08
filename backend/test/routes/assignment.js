let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let expect = chai.expect;
let assignment = require('../../db/assignment.js');

chai.use(chaiHttp);

describe('Assignments', () => {
    beforeEach(() => {
        assignment.remove({});
    });

    describe('/GET Assignment', () => {
        it('should return status 200', () => {
            return chai.request(server)
                .get('/assignment')
                .then((res) => {
                    expect(res.status).to.equal(200);
                });
        });

        it('should return one book', () => {
            return chai.request(server)
                .get('/assignment')
                .then((res) => {
                    expect(res.body).to.be.a('object');
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
                requirements: 'Requirements text',
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

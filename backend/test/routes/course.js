let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let expect = chai.expect;

chai.use(chaiHttp);

describe('Courses', () => {
    describe('/GET Course', () => {
        it('should return status 200', () => {
            return chai.request(server)
                .get('/api/v1/course')
                .then((res) => {
                    expect(res.status).to.equal(200);
                });
        });

        it('should return one course', () => {
            return chai.request(server)
                .get('/api/v1/course')
                .then((res) => {
                    expect(res.body).to.be.a('object');
                });
        });
    });
});

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let expect = chai.expect;

chai.use(chaiHttp);

describe('Assignments', () => {
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
            let assignment = { form: 'text' };
            return chai.request(server)
                .post('/assignment')
                .send(assignment)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.data).to.equal(assignment.form);
                });
        });
    });
});

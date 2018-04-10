let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let expect = chai.expect;

chai.use(chaiHttp);

describe('Professors', () => {
    describe('/GET Professor', () => {
        it('should return status 200', () => {
            return chai.request(server)
                .get('/professor')
                .then((res) => {
                    expect(res.status).to.equal(200);
                });
        });

        it('should return all professors', () => {
            return chai.request(server)
                .get('/professor')
                .then((res) => {
                    expect(res.body).to.be.a('array');
                });
        });
    });
});

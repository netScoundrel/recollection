const supertest = require('supertest');
const should = require('should');

// This agent refers to PORT where program is running.
const server = supertest.agent('http://localhost:5000');

// mongodb connection
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/recollection?retryWrites=true");
const db = mongoose.connection;


// UNIT test beginning
describe('Log in test', () => {

    it('user exist', (done) => {
        server
            .post('/api/login')
            .send({email: 'estfrom@gmail.com', password: '123'})
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.message.should.equal('successfully authenticated');
                done();
            });
    });

    it('user doesn\'t exist', (done) => {
        server
            .post('/api/login')
            .send({email: 'lame@gmail.com', password: 'whatever'})
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.res.statusMessage.should.equal('Wrong email or password');
                done();
            });
    });

    it('wrong password', (done) => {
        server
            .post('/api/login')
            .send({email: 'estfrom@gmail.com', password: 'wrongpassword'})
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                res.res.statusMessage.should.equal('Wrong email or password');
                done();
            });
    });

    it('empty field', (done) => {
        server
            .post('/api/login')
            .send({email: 'estfrom@gmail.com', password: ''})
            .expect(400)
            .end((err, res) => {
                res.status.should.equal(400);
                res.res.statusMessage.should.equal('Email and password are required.');
                done();
            });
    });
});

module.exports = {
    server: server,
    mongoose: mongoose
}
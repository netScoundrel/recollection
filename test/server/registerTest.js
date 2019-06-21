const { server } = require('./loginTest');
const { mongoose } = require('./loginTest');

// mongodb connection
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/recollection?retryWrites=true");

const db = mongoose.connection;

describe('Register test', () => {
   it('user created successfully', (done) => {
     server
         .post('/api/register')
         .send({email: 'test@test.su', username: 'tester', password: 'test', confirm: 'test'})
         .expect(200)
         .end((err, res) => {
            res.res.text.should.equal('User successfully created');
            const users = db.collection('users');

            setTimeout(() => {
                users.findOneAndDelete({"email": "test@test.su", "username": "tester"}, {}, () => {
                    done();
                });
            }, 100);
         });
   });

   it('passwords doesn\'t match', (done) => {
    server
        .post('/api/register')
        .send({email: 'test@test.su', username: 'tester', password: 'test', confirm: 'notTest'})
        .expect(401)
        .end((err, res) => {
            res.res.statusMessage.should.equal('passwords doesn\'t match');
            done();
        });
   });

   it('not all credentials are entered', (done) => {
    server
        .post('/api/register')
        .send({email: 'test@test.su', password: 'test', confirm: 'test'})
        .expect(400)
        .end((err, res) => {
            res.res.statusMessage.should.equal('All fields are required!');
            done();
        });
   });
});

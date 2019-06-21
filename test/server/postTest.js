const { server } = require('./loginTest');
const { mongoose } = require('./loginTest');

// mongodb connection
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/recollection?retryWrites=true");
const db = mongoose.connection;

//Unit tests


describe('Post tests', () => {
    it('post created successfully', (done) => {
        server
            .post('/api/post')
            .send({title: "Test Title 13133131313133333", text: "Test Text", name: "Paul"})
            .expect(200)
            .end((err, res) => {
                res.res.statusMessage.should.equal('Post created');

                const posts = db.collection('posts');

                setTimeout(() => {
                    posts.findOneAndDelete({"title": "Test Title 13133131313133333", "text": "Test Text"}, {}, () => {
                        done();
                    });
                }, 100);
            })
    });

    it('fields required', (done) => {
       server
        .post('/api/post')
        .send({title: "", text: "23", name: "Paul"})
        .expect(401)
        .end((err, res) => {
            res.res.statusMessage.should.equal('All fields are required');
            done();
        })
    });
});



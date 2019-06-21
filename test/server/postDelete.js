const { server } = require('./loginTest');
const { mongoose } = require('./loginTest');

// mongodb connection
mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/recollection?retryWrites=true");
const db = mongoose.connection;

//Unit tests

const Post = require('../../server/models/post');

describe('Delete Tests', () => {
    const posts = db.collection('posts');
    //creates post to delete
    Post.create({title: "Test Title#123", text: "Test Text#123", publishDate: new Date(), ownerId: "4", postId: "999999991", likes: {userId: []}});
    it('post deleted', (done) => {    
        server
            .post('/api/delete-post')
            .send({id: "999999991", username: 'Paul', ownerId: "4", userId: "4"})
            .expect(200)
            .end((err, res) => {
                res.res.text.should.equal('Deleted');
                setTimeout(() => {
                    done();
                }, 500);
            })
    });
    
    it('post denied', (done) => {
       server
        .post('/api/delete-post')
        .send({"id": "1", "username": "Ruben", "ownerId": "4", "userId": "2"})
        .expect(200)
        .end((err, res) => {
            res.res.text.should.equal('Rejected');
            done();
        }) 
    });
});
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    postId: {
        type: String,
        unique: true,
        required: true
    },
    ownerId:{
        type: String,
        unique: false,
        required: true,
    },
    title:{
        type: String,
        unique: false,
        required: true,
    },
    text:{
        type: String,
        unique: false,
        required: true,
    },
    publishDate:{
        type: Date,
        unique: false,
        required: true,
    },
    likes:{
        type: Object,
        unique: false,
        required: false,
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
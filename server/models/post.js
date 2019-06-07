import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    ownerId:{
        type: String,
        unique: false,
        required: true, //needs to be changed later
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
    accesibility:{
        type: String,
        unique: false,
        required: false, //needs to be changed later
    },
    publishDate:{
        type: Date,
        unique: false,
        required: true,
    },
    likes:{
        type: Array,
        unique: false,
        required: false,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
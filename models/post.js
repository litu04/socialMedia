const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // linking it with the user by checking the objectId
        ref: 'User'
    }
},
{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        postId: {
            type: String,
            required: true
        },
        message: { 
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        likers: {
            type: [String],
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamps: Number
                }
            ]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', postSchema);
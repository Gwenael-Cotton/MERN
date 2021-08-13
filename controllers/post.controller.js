const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errors.utils');
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.readPost = (req, res) => {
    PostModel.find((error, data) => {
        if (!error) res.send(data);
        else console.log('Cant get data post' + error);
    })
};

module.exports.createPost = async (req, res) => {
    let fileName;

    if (req.file != null) {
        try {
            if (
                req.file.detectedMineType !== "image/jpg" &&
                req.file.detectedMineType !== "image/jpeg" &&
                req.file.detectedMineType !== "image/png"
                )
                throw Error("invalid file");
    
                if (req.file.size > 500000) throw Error("Max size");
        } catch (error) {
            const errors = uploadErrors(error)
            return res.status(201).json({errors});
        }
    
        fileName = req.body.posterId + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${_direname}/../client/public/uploads/profil/${fileName}`
            )
        )
    }


    const newPost = new PostModel({
        postId: req.body.postId,
        message: req.body.message,
        piscture: req.file != null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        res.status(200).json({ post });
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' })

    const updateMessage = {
        message: req.body.message,
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateMessage },
        { new: true },
        (error, data) => {
            if (!error) res.send(data);
            else console.log("Update" + error);
        }
    )
};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' })

    try {
        PostModel.findByIdAndRemove({ _id: req.params.id }).exec();
        await res.status(200).send({ message: 'Post delete' });
    } catch (error) {
        console.log(error);
    }
};

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' })

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,

            { $addToSet: { likers: req.body.id } },
            { new: true },
            (error, data) => {
                if (error) return res.status(400).send(error);
            }
        )

        await UserModel.findByIdAndUpdate(
            req.body.id,

            { $addToSet: { likes: req.body.id } },
            { new: true },
            (error, data) => {
                if (!error) return res.send(data);
                return res.status(400).send(error);
            }
        ).select('-password')
    } catch (error) {
        return res.status(400).send(error);
    }

}

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' })

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,

            { $pull: { likers: req.body.id } },
            { new: true },
            (error, data) => {
                if (error) return res.status(400).send(error);
            }
        )

        await UserModel.findByIdAndUpdate(
            req.body.id,

            { $pull: { likes: req.body.id } },
            { new: true },
            (error, data) => {
                if (!error) return res.send(data);
                return res.status(400).send(error);
            }
        ).select('-password')
    } catch (error) {
        return res.status(400).send(error);
    }

}

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' });

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamps: new Date().getTime()
                    }
                }
            },
            { new: true },
            (error, data) => {
                if (!error) return res.send(data);
                else return res.status(400).send(error);
            }
        )
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' });

    try {
        return PostModel.findById(req.params.id, (error, data) => {
            // console.log('data', data.comments);
            const comment = data.comments.find((commentObject) =>
                commentObject._id.equals(req.body.commentId)
            );
            console.log('before', comment);
            if (!comment) return res.status(404).send(error);
            comment.text = req.body.text;
            console.log('after', comment);
            return data.save((error) => {
                if (!error) return res.status(200).send(data);
                return res.status(500).send(error);
            })
        })
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports.deleteComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' });

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new: true },
            (error, data) => {
                if (!error) return res.send(data);
                else return res.status(400).send(error);
            }
        )
    } catch (error) {
        return res.status(400).send(error);
    }
}
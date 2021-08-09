const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.findAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

module.exports.findOneUser = async (req, res) => {
    // console.log('Id requested', req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'id unknown' });

    UserModel.findById(req.params.id, (error, data) => {
        if (!error) res.send(data);
        else console.log('id unknown' + error);
    }).select('-password');
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send({ message: 'id unknown' });

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (error, data) => {
                if (!error) return res.send(data);
                if (error) return res.status(500).send({ message: error });
            }
        )
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send({ message: 'id unknown' });

    try {
        // .exec n'est pas obligatoire mais il donne une trace de pile en cas d'erreur (liste des appels)
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send({ message: 'id unknown' });

    try {
        // Ajoute un follow
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (error, data) => {
                if (!error) res.status(201).json(data);
                else return res.status(400).json(error);
            }
        );
        // Ajoute un follower
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (error) => {
                if (error) return res.status(400).json(error);
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow))
        return res.status(400).send({ message: 'id unknown' });

    try {
        // Supprime un follow
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            (error, data) => {
                if (!error) res.status(201).json(data);
                else return res.status(400).json(error);
            }
        );
        // Supprime un follower
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (error) => {
                if (error) return res.status(400).json(error);
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
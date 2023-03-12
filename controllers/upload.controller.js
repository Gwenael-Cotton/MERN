const UserModel = require('../models/user.model');
const uploadErrors = require('../utils/errors.utils');
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfile = async (req, res) => {
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

    const fileName = req.body.pseudo + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${_direname}/../client/public/uploads/profil/${fileName}`
        )
    )

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: {picture: "../uploads/profil/" + fileName}},
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (error, data) => {
                if (!error) return res.send(data);
                else return res.status(500).send(error);
            }
        )
    } catch (error) {
        return res.status(500).send(error);
    }
};
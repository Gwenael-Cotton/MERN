const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 1 * 24 * 60 * 60 * 1000; // 24h

const createToken = (id) => {
    console.log(id);
    return jwt.sign({id}, process.env.TOKEN_SECRET_KEY, { expiresIn: maxAge });
}

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(200).json({user : user.id});
    } catch (error) {
        console.log('Error creating user', error);
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports.logout = (_, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'logout' });
}
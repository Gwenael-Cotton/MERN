const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

// verification constante de l'user connecté
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (error, decodedToken) => {
            if(error) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1});
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}
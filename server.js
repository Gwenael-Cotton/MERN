const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    "allowedHeaders": ['sessionId', 'Content-Type'],
    "exposedHeaders": ['sessionId'],
    "methods": 'GET,HEAD.PUT,PATCH,POST,DELETE',
    "preflightContinue": false,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


// listen server
app.listen(5000, () => {
    console.log(`listen on port ${process.env.PORT}`);
});
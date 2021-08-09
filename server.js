const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const {checkUser} = require('./middleware/auth.middleware');

app.use(express.json());
app.use(cookieParser());

// jwt
app.get('*', checkUser);

// routes
app.use('/api/user', userRoutes);


// listen server
app.listen(5000, () => {
    console.log(`listen on port ${process.env.PORT}`);
});
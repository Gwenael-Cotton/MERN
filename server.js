const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

app.listen(5000, () => {
    console.log(`listen on port ${process.env.PORT}`);
});
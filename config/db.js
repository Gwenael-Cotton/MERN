// Connect Mongodb database with mongoose
const mongoose = require('mongoose');

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER_PASSWORD}@cluster0.k7npr.mongodb.net/mern-project`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    .then(() => console.log('Connected to Mongodb'))
    .catch((error) => console.log('Failed to connect to Mongodb: ' + error))
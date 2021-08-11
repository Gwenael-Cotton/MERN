const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1024,
        },
        piscture: {
            type: String,
            default: './uploads/profil/random-user.png'
        },
        bio: {
            type: String,
            max: 1024,
        },
        followers: {
            type: [String],
        },
        following: {
            type: [String],
        },
        likes: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// methode schema.pre de mongoose ' avant de save en bdd '
// save est l'evenement 
userSchema.pre("save", async function(next) {
    // methode genSalt de bcrypt pour generer le nombre de passages au hash
    // par defaut 10
    const salt = await bcrypt.genSalt();
    // hash prend en parametre la data et le nombre de hashage
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// trouve le user par l'email et compare le password en bdd qui est hash et le retourne
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Authentication failed');
    }
    throw Error('Incorrect Email');
}

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
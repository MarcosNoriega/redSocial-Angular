const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    name: {require: true, type: String},
    surname: {require: true, type: String},
    mail: {require: true, type: String},
    password: {require: true, type: String},
    seguidores: {default: 0, type: Number}
});

User.methods.encriptpassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

User.methods.comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = mongoose.model('User', User);
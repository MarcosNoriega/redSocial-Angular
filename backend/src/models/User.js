const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    name: {require: true, type: String},
    surname: {require: true, type: String},
    mail: {require: true, type: String},
    password: {require: true, type: String},
});

User.methods.encriptpassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

User.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', User);
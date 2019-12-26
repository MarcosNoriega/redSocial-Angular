const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema;

const Siguiendo = new Schema({
    idUser: ObjectId,
    siguiendo: []
});

module.exports = mongoose.model('Siguiendo', Siguiendo);

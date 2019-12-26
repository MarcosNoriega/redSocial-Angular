const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema;

const Seguidores = new Schema({
    idUser: ObjectId,
    seguidores: []
});

module.exports = mongoose.model('Seguidores', Seguidores);
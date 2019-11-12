const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Image = new Schema({
    userId: ObjectId,
    public_id: String,
    AlbumId: String,
    nombre: {type: String, required: true},
    descripcion: {type: String, default: ''},
    ruta: String
});

module.exports = mongoose.model('Image', Image);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Image = new Schema({
    userId: ObjectId,
    public_id: String,
    AlbumId: ObjectId,
    nombre: {type: String, required: true},
    descripcion: {type: String, default: ''},
    ruta: String,
    likes: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now},
    publico: {type: Boolean, default: false},
    views: {type: Number, default: 0}
});

module.exports = mongoose.model('Image', Image);
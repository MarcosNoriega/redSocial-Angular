const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema;

const UserXLikes = new Schema({
    userId: ObjectId,
    imagenId: ObjectId
});

module.exports = mongoose.model('UserXLikes', UserXLikes);

const albumController = {};
const Album = require('../models/Album');

albumController.index = async (req, res) => {
    const albumes = await Album.find({user_id: req.userId});

    return res.json(albumes);
}

albumController.create = async (req, res) => {
    const {nombre, description} = req.body;

    const album = new Album({
        nombre,
        description,
        user_id: req.userId
    });

    await album.save();

    return res.json({message: 'successfully saved album', album});
}

albumController.delete = async (req, res) => {
    const {id} = req.params;
    const album = await Album.findByIdAndDelete(id);

    return res.json({message: 'successfull', album})
}

albumController.show = async (req, res) => {
    const {id} = req.params;
    const album = await Album.findById(id);

    return res.json(album);
}

albumController.update = async (req, res) => {
    const {id} = req.params;
    const album = await Album.findByIdAndUpdate(id, req.body);

    res.json({message: 'successfull', album});
}

module.exports = albumController;
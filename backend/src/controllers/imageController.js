const imagenController = {};
const Image = require('../models/Image');
const User = require('../models/User');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

imagenController.index = async (req, res) => {
    const imagenes = await Image.find({userId: req.userId});

    return res.json(imagenes);
}

imagenController.create = async (req, res) => {
    const {nombre, descripcion} = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const image = new Image({
        userId: req.userId,
        public_id: result.public_id,
        nombre,
        descripcion,
        ruta: result.url
    });

    await fs.unlink(req.file.path);

    await image.save();

    res.json({message: 'successfully saved image', image});
}

imagenController.searchXalbum = async (req, res) => {
    const {idAlbum} = req.params;
    const image = await Image.find({AlbumId: idAlbum});

    return res.json(image);
}

imagenController.delete = async (req, res) => {
    const {id} = req.params;
    const image = await Image.findByIdAndDelete(id);
    await cloudinary.v2.uploader.destroy(image.public_id);

    return res.json({message: 'successfull', image});
}




module.exports = imagenController;
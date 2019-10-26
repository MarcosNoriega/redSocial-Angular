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
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(401).json({
            auth: false,
            message: 'No user found'
        });
    }

    const imagenes = await Image.find({userId: req.userId});

    return res.json(imagenes);
}

imagenController.create = async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(401).json({
            auth: false,
            message: 'No user found'
        });
    }

    const {nombre, descripcion} = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const image = new Image({
        userId: user._id,
        public_id: result.public_id,
        nombre,
        descripcion,
        ruta: result.url
    });

    await fs.unlink(req.file.path);

    await image.save();

    res.json({message: 'successfully saved image', image});
}

module.exports = imagenController;
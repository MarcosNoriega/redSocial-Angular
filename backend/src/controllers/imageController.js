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
    const {nombre, descripcion, albumId, publico} = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const image = new Image({
        userId: req.userId,
        public_id: result.public_id,
        nombre,
        descripcion,
        ruta: result.url,
        AlbumId: albumId,
        publico
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

imagenController.show = async (req, res) => {
    const {id} = req.params;
    const image = await Image.findById(id);

    image.views += 1;
    image.save(); 

    return res.json(image);
}

imagenController.update = async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, albumId, publico} = req.body;
    const image = await Image.findById(id);

    if (image.userId != req.userId) {
        return res.status(401).json({message: 'unauthorized user'});
    }

    image.nombre = nombre;
    image.descripcion = descripcion;
    image.albumId = albumId;
    image.publico = publico;

    image.save();

    return res.json({message: 'updated successfy', image});
}

imagenController.getContenido = async (req, res) => {
    const images = await Image.find({publico: true}).sort({likes: -1});

    res.json(images);
}

imagenController.getImagesUser = async (req, res) => {
    const {id} = req.params;
    const images = await Image.find({userId: id, publico: true});

    res.json(images);
}

imagenController.getImagesUserTop5V = async(req, res) => {
    const {userId} = req.params;

    const images = await Image.find({userId, publico: true}).limit(5).sort({views: -1});

    res.json(images);
}

imagenController.getImagesPopularesUser = async (req, res) => {
    const {userId} = req.params;

    const images = await Image.find({userId, publico: true}).limit(3).sort({likes: -1});

    res.json(images);
}

imagenController.search = async (req, res) => {
    const {termino} = req.params;

    const images = await Image.find({nombre: { $regex: '.*' + termino + '.*' }, publico: true});

    return res.json(images);
}




module.exports = imagenController;
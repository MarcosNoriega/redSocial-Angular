const likesController = {};
const Image = require('../models/Image');
const UserXLikes = require('../models/UserXLikes');

likesController.create = async (req, res) => {
    const {imagenId} = req.body;

    let userXLikes = await UserXLikes.findOne({userId: req.userId, imagenId});

    if (userXLikes) {
        return res.json({message: 'you already liked him'});
    }

    userXLikes = new UserXLikes({
        userId: req.userId,
        imagenId,
    });

    const image = await Image.findById(imagenId);
    image.likes += 1;
    image.save();

    await userXLikes.save();

    return res.json({message: 'saved successfy', image});
}

likesController.delete = async (req, res) => {
    const {imagenId} = req.body;

    const userXLikes = await UserXLikes.deleteOne({userId: req.userId, imagenId});

    const image = await Image.findById(imagenId);
    image.likes -= 1;
    image.save();

    return res.json({message: 'deleted successfy', image});
}

likesController.toggleLike = async (req, res) => {
    const {imagenId} = req.body;

    let userXLikes = await UserXLikes.findOne({userId: req.userId, imagenId});

    if (userXLikes) {
        await likesController.delete(req, res);
    }
    else{
        await likesController.create(req, res);
    }
}

likesController.likesImages = async (req, res) => {
    const userXLikes = await UserXLikes.find({userId: req.userId});

    let images = [];

    for(let item of userXLikes) {
        let image = await Image.findById(item.imagenId);

        images.push(image);
    }

    res.json(images);
}

likesController.getLikes = async (req, res) => {
    const {imagenId} = req.params;
    const userXLikes = await UserXLikes.find({userId: req.userId, imagenId});

    res.json(userXLikes);
}

module.exports = likesController;
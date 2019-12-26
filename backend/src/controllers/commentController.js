commentController = {};
const Comment = require('../models/comment');
const md5 = require('md5');

commentController.create = async (req, res) => {
    const {comentario, imagen_id} = req.body;
    const comment = new Comment({
        imagen_id: imagen_id,
        user_id: req.userId,
        comentario: comentario,
        gravatar: md5(req.user.mail)
    });
    await comment.save();

    res.json({message: 'successfully saved comment', comment});

}

commentController.delete = async (req, res) => {
    const comment = await Comment.findOne({_id: req.params.id, user_id: req.userId});
    
    if (!comment) {
        return res.status(404).json({message: 'item not found'});
    }

    await comment.delete();

    res.json({message: 'successfull', comment});
}


commentController.update = async (req, res) => {
    const {id} = req.params;
    const {comentario} = req.body;

    const comment = await Comment.findOne({_id: id, user_id: req.userId});

    if (!comment) {
        return res.status(404).json({message: 'item not found'});
    }

    comment.comentario = comentario;
    comment.modificado = true;
    await comment.save();

    return res.json({message: 'updated successfy', comment})

}

commentController.index = async (req, res) => {
    const {idImagen} = req.params;
    const comments = await Comment.find({imagen_id: idImagen}).sort({timestamp: -1});

    res.json(comments);
}

commentController.show = async (req, res) => {
    const {id} = req.params;
    const comment = await Comment.findById(id);

    res.json(comment);
}

module.exports = commentController;
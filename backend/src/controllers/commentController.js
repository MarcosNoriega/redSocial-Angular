commentController = {};
const Comment = require('../models/comment');

commentController.create = async (req, res) => {
    const {comentario} = req.body;
    const {idImagen} = req.params;
    const comment = new Comment({
        imagen_id: idImagen,
        user_id: req.userId,
        comentario
    });
    await comment.save();

    res.json({message: 'successfully saved comment', comment});

}

commentController.delete = async (req, res) => {
    const comment = await Comment.deleteOne({_id: req.params.id, user_id: user._id});

    res.json({comment});
}

module.exports = commentController;
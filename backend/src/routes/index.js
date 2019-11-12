const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const imageController = require('../controllers/imageController');
const commentController = require('../controllers/commentController');
const albumController = require('../controllers/albumController');
const middleware = require('../middleware');

router.post('/register', userController.register);
router.post('/auth', userController.auth);
router.post('/logout', middleware.verifyToken, userController.logout);

router.get('/images', middleware.verifyToken, imageController.index);
router.post('/images/create', middleware.verifyToken, imageController.create);
router.get('/images/album/:id', middleware.verifyToken, imageController.searchXalbum);

router.post('/comment/create/:idImagen', middleware.verifyToken, commentController.create);
router.delete('/comment/delete/:id', middleware.verifyToken, commentController.delete);

router.get('/album', middleware.verifyToken, albumController.index);
router.post('/album/create', middleware.verifyToken, albumController.create);
router.delete('/album/delete/:id', middleware.verifyToken, albumController.delete);
router.get('/album/show/:id', middleware.verifyToken, albumController.show);

module.exports = router;
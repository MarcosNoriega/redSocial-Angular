const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const imageController = require('../controllers/imageController');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware');

router.post('/login', userController.login);
router.post('/auth', userController.auth);

router.get('/images', middleware.verifyToken, imageController.index);
router.post('/images/create', middleware.verifyToken, imageController.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');

router.post('/login', userController.login);
router.post('/auth', userController.auth);

module.exports = router;
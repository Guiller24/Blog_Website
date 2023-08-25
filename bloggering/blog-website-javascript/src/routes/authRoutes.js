const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/users-login', authController.login);

module.exports = router;
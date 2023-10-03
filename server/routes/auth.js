const express = require('express');
const authenticateUser = require('../middlewares/authenticateUser');
const AuthController = require('../controllers/AuthControllers');

const routes = express.Router();

routes.get('/verify', authenticateUser, AuthController.isAuthenticated);

module.exports = routes;

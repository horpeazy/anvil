const express = require('express');
const OAuthController = require('../controllers/OAuthControllers');

const routes = express.Router();

routes.post('/github/callback', OAuthController.postGithub);
routes.post('/google/callback', OAuthController.postGoogle);
routes.post('/gitlab/callback', OAuthController.postGitlab);

module.exports = routes;

const express = require('express');
const authenticateUser = require('../middlewares/authenticateUser');
const ProjectController = require('../controllers/ProjectControllers');

const routes = express.Router();

routes.get('/projects/', authenticateUser, ProjectController.getAllProjects);
routes.post('/projects/', authenticateUser, ProjectController.createProject);
routes.get('/project/:id', authenticateUser, ProjectController.getProjectById);
routes.put('/project/:id', authenticateUser, ProjectController.updateProjectById);
routes.put('/project/:id/file', authenticateUser, ProjectController.createNewFile);
routes.put('/project/:id/folder', authenticateUser, ProjectController.createNewFolder);
routes.delete('/project/:id', authenticateUser, ProjectController.deleteProjectById);
routes.get('/projects/recent', authenticateUser, ProjectController.getRecentProjects);
routes.get('/projects/shared', authenticateUser, ProjectController.getSharedProjects);
routes.get('/projects/contributions', authenticateUser, ProjectController.getContributedProjects);
routes.get('/projects/drafts', authenticateUser, ProjectController.getDraftProjects);
routes.get('/projects/deleted', authenticateUser, ProjectController.getDeletedProjects);

module.exports = routes;

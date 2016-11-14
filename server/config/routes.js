const profileController = require('../profiles/profileController.js');
const projectController = require('../projects/projectController.js');
const techController = require('../tech/techController.js');
const likeController = require('../likes/likeController.js');
const commentController = require('../comments/commentController.js');

module.exports = function (app, express) {

  //User Routes

  //Signup/Login --Needs Authentication
  app.post('/api/user/create', profileController.createUser);
  app.post('/api/team/create', profileController.createTeam);
  app.put('/api/team/edit', profileController.editTeamInfo);
  app.delete('/api/team/delete', profileController.deleteTeam);
  app.post('/api/team/addMember', profileController.addMember);
  app.delete('/api/team/removeMember', profileController.removeMember);
  //Others to view profiles
  app.get('/api/profile/:profileId', profileController.getProfile);
  //Edit user profile --Needs authentication
  app.put('/api/user/edit', profileController.editUserInfo);

  //Tech Routes
  app.post('/api/profile/addTech', techController.profileAddTech);
  app.delete('/api/profile/removeTech', techController.profileRemoveTech);
  app.post('/api/project/addTech', techController.projectAddTech);
  app.delete('/api/project/removeTech', techController.projectRemoveTech);
  app.get('/api/tech', techController.getAllTech);

  //Project Routes

  app.post('/api/project/create', projectController.createProject);
  app.post('/api/project/upload/:projectId', projectController.uploadProjectImage);
  app.post('/api/project/thumbnail/:projectId', projectController.uploadProjectThumbnail);
  app.get('/api/project/id/:projectId', projectController.getProject);
  app.get('/api/project/getAll', projectController.getAllProjects);
  app.put('/api/project/edit', projectController.editProject);
  app.delete('/api/project/delete', projectController.deleteProject);

  //Comment Routes
  app.post('/api/comment/create/:projectId', commentController.addCommentToProject);
  app.delete('/api/comment/delete/:commentId', commentController.removeComment);

  //Like routes
  app.post('/api/like/:projectId', likeController.likeProject);
};
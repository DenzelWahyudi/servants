const express = require('express');
const usersController = require('./users-controller');
const route = express.Router();
const authMiddleware = require('../../../core/middlewares/auth');

module.exports = (app) => {
  app.use('/users', route);

  // static routes
  route.post('/', usersController.createUser);
  
  route.post('/login', usersController.login);

  // // specific dynamic routes
  // route.get('/name/:id', usersController.getUserName);

  // route.put('/update/email/:id', usersController.updateUserEmail);

  // route.put('/update/phonenumber/:id', usersController.updateUserPhoneNumber);

  // route.put('/update/password/:id', usersController.changePassword);

  route.get('/name', authMiddleware, usersController.getUserName);

  route.put('/update/email', authMiddleware, usersController.updateUserEmail);

  route.put('/update/phonenumber', authMiddleware, usersController.updateUserPhoneNumber);

  route.put('/update/password', authMiddleware, usersController.changePassword);

  // generic dynamic routes
  route.get('/', authMiddleware, usersController.getUser);

  route.delete('/', authMiddleware, usersController.deleteUser);
};

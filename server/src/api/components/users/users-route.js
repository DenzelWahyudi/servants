const express = require('express');
const usersController = require('./users-controller');
const route = express.Router();
const authMiddleware = require('../../../core/middlewares/auth');

module.exports = (app) => {
  app.use('/users', route);

  // static routes
  route.get('/', usersController.getUsers);

  route.post('/', usersController.createUser);
  
  route.post('/login', usersController.login);

  route.post('/login/admin', usersController.loginAdmin);

  // // specific dynamic routes
  // route.get('/name/:id', usersController.getUserName);

  // route.put('/update/email/:id', usersController.updateUserEmail);

  // route.put('/update/phonenumber/:id', usersController.updateUserPhoneNumber);

  // route.put('/update/password/:id', usersController.changePassword);

  route.get('/id', authMiddleware, usersController.getUserId);
  
  route.get('/name', authMiddleware, usersController.getUserName);

  route.post('/send-otp', usersController.sendOTP);

  route.post('/verify-otp', usersController.verifyOTP);

  route.put('/update/password', authMiddleware, usersController.changePassword);

  route.put('/update/email/:id', usersController.updateEmail);

  route.put('/update/phonenumber/:id', usersController.updatePhoneNumber);

  route.put('/update/name/:id', usersController.updateName);

  // generic dynamic routes
  route.get('/', authMiddleware, usersController.getUser);

  route.delete('/:id', usersController.deleteUser);
};

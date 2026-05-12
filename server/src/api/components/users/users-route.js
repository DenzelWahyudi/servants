const express = require('express');

const usersController = require('./users-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // static routes
  route.post('/', usersController.createUser);

  // specific dynamic routes
  route.get('/name/:id', usersController.getUserName);

  route.put('/update/email/:id', usersController.updateUserEmail);

  route.put('/update/phonenumber/:id', usersController.updateUserPhoneNumber);

  route.put('/update/password/:id', usersController.changePassword);

  // generic dynamic routes
  route.get('/:id', usersController.getUser);

  route.delete('/:id', usersController.deleteUser);
};

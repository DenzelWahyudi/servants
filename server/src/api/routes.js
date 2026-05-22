const express = require('express');

const users = require('./components/users/users-route');
const services = require('./components/services/services-route');
const roles = require('./components/roles/roles-route');
const assignment = require('./components/assignments/assignments-route');

module.exports = () => {
  const app = express.Router();

  users(app);
  services(app);
  roles(app);
  assignment(app);
  
  return app;
};

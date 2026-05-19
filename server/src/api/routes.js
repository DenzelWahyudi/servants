const express = require('express');

const users = require('./components/users/users-route');
const services = require('./components/services/services-route');
const roles = require('./components/roles/roles-route');
module.exports = () => {
  const app = express.Router();

  users(app);
  services(app);
  roles(app);

  return app;
};

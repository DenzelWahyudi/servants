const express = require('express');

const users = require('./components/users/users-route');
const services = require('./components/services/services-route');

module.exports = () => {
  const app = express.Router();

  users(app);
  services(app);

  return app;
};

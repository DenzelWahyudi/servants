const express = require('express');
const servicesController = require('./services-controller');
const route = express.Router();

module.exports = (app) => {
    app.use('/services', route);

    route.get('/', servicesController.getServices);

    route.post('/create', servicesController.createService);

    route.post('/update/:serviceId', servicesController.updateService)

    route.post('/delete/:serviceId', servicesController.deleteService);

    route.get('/:id', servicesController.getService);
};

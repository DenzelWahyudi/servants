const express = require('express');
const servicesController = require('./services-controller');
const route = express.Router();

module.exports = (app) => {
    app.use('/services', route)

    route.get('/', servicesController.getServices)

    route.post('/create', servicesController.createService)

    route.put('/update/:serviceId', servicesController.updateService)

    route.put('/updatestatus/:serviceId', servicesController.updateStatus)

    route.post('/delete/:serviceId', servicesController.deleteService)

    route.get('/:id', servicesController.getService)
};

const servicesService = require('./services-service');
const rolesService = require('../roles/roles-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createService(req, res, next){
    try {
        const { name, date, time, status, roles } = req.body;
        if (!name){
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Service name is required');
        }
        if (!date){
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Date is required');
        }
        if (!time){
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Time is required');
        }
        if (!status){
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Status is required');
        }

        const serviceSuccess = await servicesService.createService(name, date, time, status);
        if (!serviceSuccess){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to create service');
        }
        const serviceId = serviceSuccess._id;

        if (roles){
            const rolesBody = roles.map(role => ({
                serviceId,
                name: role.name,
                spotsTotal: role.spotsTotal,
                spotsFilled: 0
            }));

            const rolesSuccess = await rolesService.createRoles(rolesBody);
            if (!rolesSuccess){
                throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to create roles');
            }
        }

        return res.status(201).json({ message: 'Service created succesfully' });
    } catch (error) {
        return next(error);
    }
}

async function getServices(req, res, next){
    try {
        const services = servicesService.getServices();
        if (!services){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get services');
        }
        return res.status(201).json(services);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    createService,
    getServices
};

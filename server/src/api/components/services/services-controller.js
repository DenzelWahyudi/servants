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

        if (roles.some(role => !role.name)){
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Role name is required');
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
        const services = await servicesService.getServices();
        if (!services){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get services');
        }
        return res.status(200).json(services);
    } catch (error) {
        return next(error);
    }
}

async function getService(req, res, next){
    try {
        const serviceId = req.params.id;
        const success = await servicesService.getService(serviceId);
        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get service');
        }
        return res.status(200).json(success);
    } catch (error) {
        return next(error);
    }
}

async function deleteService(req, res, next){
    try {
        const serviceId = req.params.serviceId;
        const service = await servicesService.getService(serviceId);
        if (!service){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get service');
        }

        const successService = await servicesService.deleteService(serviceId);
        if (!successService){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to delete service');
        }

        const successRoles = await rolesService.deleteRoles(serviceId);
        if (!successRoles){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to delete roles');
        }

        return res.status(201).json({ message: 'Service deleted successfully'});
    } catch (error) {
        return next(error);
    }
}

async function updateService(req, res, next){
    try {
        const serviceId = req.params.serviceId;
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

        if (roles.some(role => !role.name)){
            throw errorResponder(errorTypes.VALIDATION_ERROR, 'Role name is required');
        }
        
        const service = await servicesService.getService(serviceId);
        if (!service){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get service');
        }

        const successRoles = await rolesService.deleteRoles(serviceId);
        if (!successRoles){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to delete roles');
        }

        const successService = await servicesService.updateService(serviceId, name, date, time, status);
        if (!successService){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to update service');
        }

        if (roles){
            const rolesBody = roles.map(role => ({
                serviceId,
                name: role.name,
                spotsTotal: role.spotsTotal,
                spotsFilled: 0
            }));

            const rolesSuccess = await rolesService.createRoles(rolesBody);
            if (!rolesSuccess){
                throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to update roles');
            }
        }

        return res.status(200).json({ message: 'Service updated succesfully' });
    } catch (error) {
        return next(error);
    }
}

async function updateStatus(req, res, next){
    try {
        const { status } = req.body
        
        const success = await servicesService.updateStatus(req.params.serviceId, status)

        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to update service status')
        }

        return res.status(200).json({ message: "Update service status success!" })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createService,
    getServices,
    getService,
    deleteService,
    updateService,
    updateStatus
};

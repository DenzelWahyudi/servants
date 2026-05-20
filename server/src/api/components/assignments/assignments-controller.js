const assignmentsService = require('./assignments-service')
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createAssignment(req, res, next){
    try {
        const { userId, roleId, status } = req.body
        if (!userId){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'user id empty!')
        }
        if (!roleId){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'role id empty!')
        }
        
        const success = await assignmentsService.createAssignment(userId, roleId, status)
        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to create assignment.')
        }

        return res.status(201).json({ message: "Create assignment success!" })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createAssignment
}
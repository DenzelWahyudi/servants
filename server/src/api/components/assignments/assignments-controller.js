const assignmentsService = require('./assignments-service')
const rolesService = require('../roles/roles-service')
const { errorResponder, errorTypes } = require('../../../core/errors')

async function createAssignment(req, res, next){
    try {
        const { userId, roleId, status } = req.body
        if (!userId){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User id empty!')
        }
        if (!roleId){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Role id empty!')
        }
        
        const role = await rolesService.getRole(roleId)
        if (!role){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Role id invalid!')
        }

        if (await assignmentsService.hasUserBeenAssigned(roleId, userId)){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Already signed up!')
        }

        await rolesService.increaseRoleSpotsFilled(roleId)

        const success = await assignmentsService.createAssignment(userId, roleId, status)
        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to create assignment.')
        }

        return res.status(201).json({ message: "Create assignment success!" })
    } catch (error) {
        next(error)
    }
}

async function getUsersForRole(req, res, next){
    try {
        const roleId = req.params.roleId

        const success = await assignmentsService.getUsersForRole(roleId)

        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get users name')
        }

        return res.status(200).json(success)
    } catch (error) {
        next(error)
    }
}

async function getUserSchedule(req, res, next){
    try {
        const userId = req.user.id

        const success = await assignmentsService.getUserSchedule(userId)

        if(!success.length){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get user schedule')
        }

        return res.status(200).json(success)
    } catch (error) {
        next(error)
    }
}

async function getPendingStatusAssignments(req, res, next){
    try {
        const success = await assignmentsService.getPendingStatusAssignments()

        if(!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get pending status assignments')
        }

        return res.status(200).json(success)
    } catch (error) {
        next(error)
    }
}

async function updateStatus(req, res, next){
    try {
        const assignmentId = req.params.id
        const { status } = req.body

        if (!assignmentId){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Assignment id empty')
        }

        if (!status){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Status type empty')
        }

        const success = await assignmentsService.updateStatus(assignmentId, status)

        if(!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to update assignment status')
        }

        return res.status(200).json(success)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createAssignment,
    getUsersForRole,
    getUserSchedule,
    getPendingStatusAssignments,
    updateStatus
}

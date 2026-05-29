const assignmentsRepository = require('./assignments-repository')

async function createAssignment(userId, roleId, status){
    return assignmentsRepository.createAssignment(userId, roleId, status)
}

async function getUsersForRole(roleId){
    return assignmentsRepository.getUsersForRole(roleId)
}

async function hasUserBeenAssigned(roleId, userId){
    return assignmentsRepository.hasUserBeenAssigned(roleId, userId)
}

async function getUserSchedule(userId) {
    return assignmentsRepository.getUserSchedule(userId)
}

module.exports = {
    createAssignment,
    getUsersForRole,
    hasUserBeenAssigned,
    getUserSchedule
}

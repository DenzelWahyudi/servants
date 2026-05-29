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

async function getPendingStatusAssignments(){
    return assignmentsRepository.getPendingStatusAssignments()
}

async function updateStatus(assignmentId, status){
    return assignmentsRepository.updateStatus(assignmentId, status)
}

module.exports = {
    createAssignment,
    getUsersForRole,
    hasUserBeenAssigned,
    getUserSchedule,
    getPendingStatusAssignments,
    updateStatus
}

const assignmentsRepository = require('./assignments-repository')

async function createAssignment(userId, roleId, status){
    return assignmentsRepository.createAssignment(userId, roleId, status)
}

module.exports = {
    createAssignment
}
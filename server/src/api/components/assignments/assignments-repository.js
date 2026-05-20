const { Assignments } = require('../../../models');

async function createAssignment(userId, roleId, status){
    return Assignments.create({ userId, roleId, status })
}

module.exports = {
    createAssignment
}
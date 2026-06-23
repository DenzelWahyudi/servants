const rolesRepository = require('./roles-repository')
const assignmentsRepository = require('../assignments/assignments-repository')

async function createRoles(roles) {
    return rolesRepository.createRoles(roles)
}

async function createRole(serviceId, name, spotsTotal, spotsFilled) {
    return rolesRepository.createRole(serviceId, name, spotsTotal, spotsFilled)
}

async function getRoles(serviceId){
    return rolesRepository.getRoles(serviceId)
}

async function getAllRoles(){
    return rolesRepository.getAllRoles()
}

async function getRole(id){
    return rolesRepository.getRole(id)
}

async function deleteRoles(serviceId){
    const roles = await rolesRepository.getRoles(serviceId)
    roles?.map(async (r) => await assignmentsRepository.deleteAssignmentByRoleId(r._id))
    return rolesRepository.deleteRoles(serviceId)
}

async function increaseRoleSpotsFilled(id){
    return rolesRepository.increaseRoleSpotsFilled(id)
}

async function getAssignedUsersForRoles(serviceId){
    return rolesRepository.getAssignedUsersForRoles(serviceId)
}

module.exports = {
  createRoles,
  createRole,
  getRoles,
  getAllRoles,
  getRole,
  deleteRoles,
  increaseRoleSpotsFilled,
  getAssignedUsersForRoles
};

const rolesRepository = require('./roles-repository');

async function createRoles(roles) {
  return rolesRepository.createRoles(roles);
}

async function createRole(serviceId, name, spotsTotal, spotsFilled) {
    return rolesRepository.createRole(serviceId, name, spotsTotal, spotsFilled);
}

async function getRoles(serviceId){
    return rolesRepository.getRoles(serviceId)
}

async function getAllRoles(){
    return rolesRepository.getAllRoles()
}

async function deleteRoles(serviceId){
    return rolesRepository.deleteRoles(serviceId)
}

module.exports = {
  createRoles,
  createRole,
  getRoles,
  getAllRoles,
  deleteRoles
};

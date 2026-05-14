const { Roles } = require('../../../models');

async function createRoles(roles) {
    return Roles.insertMany(roles);
}

async function createRole(serviceId, name, spotsTotal, spotsFilled) {
    return Roles.create({ serviceId, name, spotsTotal, spotsFilled });
}

async function getRoles(serviceId){
    return Roles.find({ serviceId })
}

module.exports = {
  createRoles,
  createRole,
  getRoles
};

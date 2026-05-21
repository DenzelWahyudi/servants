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

async function getRole(id){
    return Roles.findById(id)
}

async function getAllRoles(){
    return Roles.find()
}

async function deleteRoles(serviceId){
    return Roles.deleteMany({ serviceId })
}

async function increaseRoleSpotsFilled(id){
    return Roles.findByIdAndUpdate(
        id,
        { $inc: { spotsFilled: +1 } },
        { new: true }
    )
}

module.exports = {
  createRoles,
  createRole,
  getRoles,
  getRole,
  getAllRoles,
  deleteRoles,
  increaseRoleSpotsFilled
};

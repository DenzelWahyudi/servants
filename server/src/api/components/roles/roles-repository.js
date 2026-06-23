const { default: mongoose } = require('mongoose');
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

async function decreaseRoleSpotsFilled(id){
    return Roles.findByIdAndUpdate(
        id,
        { $inc: { spotsFilled: -1 } },
        { new: true }
    )
}

async function getAssignedUsersForRoles(serviceId){
    return Roles.aggregate([
        {
            $match: { serviceId: new mongoose.Types.ObjectId(serviceId) }
        },
        {
            $lookup: {
                from: 'assignments',
                let: { roleId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$roleId', '$$roleId'] },
                                    { $eq: ['$status', 'confirmed']}
                                ]
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            let: { userId: '$userId' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ['$_id', '$$userId'] }
                                    }
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        name: 1
                                    }
                                }
                            ],
                            as: 'user'
                        }
                    },
                    {
                        $unwind: {
                            path: '$user',
                            preserveNullAndEmptyArrays: true         
                        }
                    }
                ],
                as: 'assignment'
            }
        },
        {
            $unwind: {
                path: '$assignment',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                name: { $first: '$name' },
                spotsTotal: { $first: '$spotsTotal' },
                spotsFilled: { $first: '$spotsFilled' },
                userNames: { $push: '$assignment.user.name' }
            }
        },
        {
            $project: {
                name: 1,
                spotsTotal: 1,
                spotsFilled: 1,
                userNames: 1
            }
        }
    ])
}

module.exports = {
  createRoles,
  createRole,
  getRoles,
  getRole,
  getAllRoles,
  deleteRoles,
  increaseRoleSpotsFilled,
  decreaseRoleSpotsFilled,
  getAssignedUsersForRoles
};

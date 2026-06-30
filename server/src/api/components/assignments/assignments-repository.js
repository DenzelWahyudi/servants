const { Assignments } = require('../../../models')
const mongoose = require('mongoose')

async function createAssignment(userId, roleId, status){
    return Assignments.create({ userId, roleId, status })
}

async function hasUserBeenAssigned(roleId, userId){
    return Assignments.findOne({ roleId, userId })
}

async function getUserSchedule(userId){
    return Assignments.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                status: 'confirmed'
            }
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'roleId',
                foreignField: '_id',
                as: 'roles'
            }
        },
        {
            $unwind: '$roles'
        },
        {
            $lookup: {
                from: 'services',
                localField: 'roles.serviceId',
                foreignField: '_id',
                as: 'services'
            }
        },
        {
            $unwind: '$services'
        },
        {
            $project: {
                _id: 0,
                roleName: '$roles.name',
                serviceName: '$services.name',
                date: '$services.date',
                time: '$services.time'
            }
        }
    ])
}

async function getPendingStatusAssignments(){
    return Assignments.aggregate([
        {
            $match: {
                status: 'pending'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'roleId',
                foreignField: '_id',
                as: 'roles'
            }
        },
        {
            $unwind: '$users'
        },
        {
            $unwind: '$roles'
        },
        {
            $lookup: {
                from: 'services',
                localField: 'roles.serviceId',
                foreignField: '_id',
                as: 'services'
            }
        },
        {
            $unwind: '$services'
        },
        {
            $project: {
                userName: '$users.name',
                roleId: 1,
                roleName: '$roles.name',
                serviceName: '$services.name',
                date: '$services.date',
                time: '$services.time'
            }
        }
    ])
}

async function getAllUserAssignments(userId){
    return Assignments.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'roleId',
                foreignField: '_id',
                as: 'roles'
            }
        },
        {
            $unwind: '$users'
        },
        {
            $unwind: '$roles'
        },
        {
            $lookup: {
                from: 'services',
                localField: 'roles.serviceId',
                foreignField: '_id',
                as: 'services'
            }
        },
        {
            $unwind: '$services'
        },
        {
            $project: {
                serviceName: '$services.name',
                roleName: '$roles.name',
                date: '$services.date',
                time: '$services.time',
                status: '$status'
            }
        }
    ])
}

async function updateStatus(assignmentId, status){
    return Assignments.updateOne({ _id: assignmentId }, { $set: { status } });
}

async function deleteAssignmentByRoleId(roleId){
    return Assignments.deleteMany({roleId})
}

async function getUsersToRelieve(roleId){
    return Assignments.aggregate([
        {
            $match: {
                roleId: new mongoose.Types.ObjectId(roleId),
                status: 'confirmed'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                _id: 0,
                userId: "$user._id",
                name: '$user.name'
            }
        }
    ])
}

async function relieveUser(userId, roleId){
    return Assignments.deleteOne({ userId, roleId })
}

async function getAllUserAssignedServices(userId){
    return Assignments.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                status: 'confirmed'
            }
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'roleId',
                foreignField: '_id',
                as: 'roles'
            }
        },
        {
            $unwind: '$roles'
        },
        {
            $lookup: {
                from: 'services',
                localField: 'roles.serviceId',
                foreignField: '_id',
                as: 'services'
            }
        },
        {
            $unwind: '$services'
        },
        {
            $group: {
                _id: { 
                    serviceName: '$services.name',
                    date: '$services.date',
                    time: '$services.time'
                },
                serviceId: { $first: '$services._id' },
            }
        },
        {
            $project: {
                _id: 0,
                serviceId: 1,
                serviceName: '$_id.serviceName',
                date: '$_id.date',
                time: '$_id.time'
            }
        }
    ])
}

async function getGroupDetails(serviceId) {
    return Assignments.aggregate([
        {
            $match: {
                status: 'confirmed',
            },
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'roleId',
                foreignField: '_id',
                as: 'roles',
            },
        },
        {
            $unwind: '$roles',
        },
        {
            $match: {
                'roles.serviceId': new mongoose.Types.ObjectId(serviceId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $unwind: '$users',
        },
        {
            $group: {
                _id: '$users._id',
                userName: { $first: '$users.name' },
                phoneNumber: { $first: '$users.phoneNumber' },
                roleName: { $push: '$roles.name' },
            },
        },
        {
            $project: {
                _id: 0,
                userId: '$_id',
                userName: 1,
                phoneNumber: 1,
                roleName: 1,
            },
        },
    ]);
}

async function getGroupMemberNames(serviceId) {
    return Assignments.aggregate([
        {
            $match: {
                status: 'confirmed',
            },
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'roleId',
                foreignField: '_id',
                as: 'roles',
            },
        },
        {
            $unwind: '$roles',
        },
        {
            $match: {
                'roles.serviceId': new mongoose.Types.ObjectId(serviceId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $unwind: '$users',
        },
        {
            $group: {
                _id: '$users._id',
                userName: { $first: '$users.name' },
            },
        },
        {
            $project: {
                _id: 0,
                userId: '$_id',
                userName: 1
            },
        },
    ]);
}

module.exports = {
    createAssignment,
    hasUserBeenAssigned,
    getUserSchedule,
    getPendingStatusAssignments,
    updateStatus,
    deleteAssignmentByRoleId,
    getAllUserAssignments,
    getUsersToRelieve,
    relieveUser,
    getAllUserAssignedServices,
    getGroupDetails,
    getGroupMemberNames
}

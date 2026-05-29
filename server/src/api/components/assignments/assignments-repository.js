const { Assignments } = require('../../../models')
const mongoose = require('mongoose')

async function createAssignment(userId, roleId, status){
    return Assignments.create({ userId, roleId, status })
}

async function getUsersForRole(roleId){
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
                name: '$user.name'
            }
        }
    ])
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

module.exports = {
    createAssignment,
    getUsersForRole,
    hasUserBeenAssigned,
    getUserSchedule
}

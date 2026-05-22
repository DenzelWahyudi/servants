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

module.exports = {
    createAssignment,
    getUsersForRole
}

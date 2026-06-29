const mongoose = require('mongoose');
const { Services } = require('../../../models');
const { Roles } = require('../../../models');
const cron = require('node-cron');

cron.schedule('0 0  * * *', async () => {
    const today = new Date();
    today.setHours(0,0,0,0);

    const expiredServices = await Services.find({ date: { $lt: today } })
    const expiredIds = expiredServices.map(s => s._id)

    await Roles.deleteMany({ serviceId: { $in: expiredIds } })
    await Services.deleteMany({ _id: { $in: expiredIds } })
    console.log("Expired services deleted")
})

async function createService(name, date, time, status){
    return Services.create({ name, date: new Date(date), time, status })
}

async function getServices(){
    return Services.find();
}

async function getService(id){
    return Services.findOne({ _id: id })
}

async function deleteService(id){
    return Services.deleteOne({ _id: id })
}

async function updateService(id, name, date, time, status){
    return Services.updateOne({ _id: id }, { $set: { name, date, time, status } })
}

async function updateStatus(id, status){
    return Services.updateOne({ _id: id }, { $set: { status }} )
}

async function getServicesWithRoles() {
    return Services.aggregate([
        {
            $lookup: {
                from: 'roles',
                localField: '_id',
                foreignField: 'serviceId',
                as: 'roles'
            }
        },
        { $sort: { date: 1 } }
    ]);
}

async function getServiceWithRoles(id) {
    const result = await Services.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'roles',
                localField: '_id',
                foreignField: 'serviceId',
                as: 'roles'
            }
        }
    ]);
    return result[0] ?? null;
}

module.exports = {
    createService,
    getServices,
    getService,
    deleteService,
    updateService,
    updateStatus,
    getServicesWithRoles,
    getServiceWithRoles
};

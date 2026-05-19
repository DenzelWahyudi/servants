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

module.exports = {
    createService,
    getServices,
    getService,
    deleteService,
    updateService
};

const { Services } = require('../../../models');

async function createService(name, date, time, status){
    return Services.create({ name, date: new Date(date), time, status })
}

async function getServices(){
    return Services.find();
}

async function getService(id){
    return Services.findOne({ id })
}

module.exports = {
    createService,
    getServices,
    getService
};

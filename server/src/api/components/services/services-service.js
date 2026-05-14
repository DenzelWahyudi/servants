const servicesRepository = require('./services-repository');

async function createService(name, date, time, status){
    return servicesRepository.createService(name, date, time, status)
}

async function getServices(){
    return servicesRepository.getServices();
}

async function getService(id){
    return servicesRepository.getService(id);
}

module.exports = {
    createService,
    getServices,
    getService
};

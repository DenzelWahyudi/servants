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

async function deleteService(id){
    return servicesRepository.deleteService(id);
}

async function updateService(id, name, date, time, status){
    return servicesRepository.updateService(id, name, date, time, status)
}

async function updateStatus(id, status){
    return servicesRepository.updateStatus(id, status)
}

module.exports = {
    createService,
    getServices,
    getService,
    deleteService,
    updateService,
    updateStatus
};

const { Chats } = require('../../../models');

async function sendChat(serviceId, userId, userName, message, status){
    return Chats.create({ serviceId, userId, userName, message, status })
}

async function getAllChats(serviceId){
    return Chats.find({ serviceId })
}

async function deleteChats(serviceId){
    return Chats.deleteMany({ serviceId })
}

module.exports = {
    sendChat,
    getAllChats,
    deleteChats
}

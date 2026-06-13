const { Chats } = require('../../../models');

async function sendChat(serviceId, userId, message, status){
    return Chats.create({ serviceId, userId, message, status })
}

async function getAllChats(serviceId){
    return Chats.find({ serviceId })
}

module.exports = {
    sendChat,
    getAllChats
}

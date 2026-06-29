const { Chats } = require('../../../models');

async function sendChat(serviceId, userId, userName, message, status, replyTo){
    return Chats.create({ serviceId, userId, userName, message, status, replyTo })
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

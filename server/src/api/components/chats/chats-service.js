const chatsRepository = require('./chats-repository')

async function sendChat(serviceId, userId, message, status){
    return chatsRepository.sendChat(serviceId, userId, message, status)
}

async function getAllChats(serviceId){
    return chatsRepository.getAllChats(serviceId)
}

module.exports = {
    sendChat,
    getAllChats
}

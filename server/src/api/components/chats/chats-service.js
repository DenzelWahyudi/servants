const chatsRepository = require('./chats-repository')

async function sendChat(serviceId, userId, userName, message, status, replyTo){
    return chatsRepository.sendChat(serviceId, userId, userName, message, status, replyTo)
}

async function getAllChats(serviceId){
    return chatsRepository.getAllChats(serviceId)
}

async function deleteChats(serviceId){
    return chatsRepository.deleteChats(serviceId)
}


module.exports = {
    sendChat,
    getAllChats,
    deleteChats
}

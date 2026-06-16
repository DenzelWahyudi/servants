const chatsRepository = require('./chats-repository')

async function sendChat(serviceId, userId, userName, message, status){
    return chatsRepository.sendChat(serviceId, userId, userName, message, status)
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

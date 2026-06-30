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

async function markChatAsRead(chatId, userId, userName){
    return Chats.findOneAndUpdate(
        {
            _id: chatId,
            'readBy.userId': { $ne: userId }
        },
        {
            $push: { readBy: { userId, userName } }
        },
        { new: true }
    )
}

async function markServiceChatsAsRead(serviceId, userId, userName) {
    return Chats.updateMany(
        {
            serviceId,
            'readBy.userId': { $ne: userId }
        },
        {
            $push: { readBy: { userId, userName }}
        }
    )
}

async function getReadStatus(chatId){
    return Chats.findById(chatId).select('readBy')
}

module.exports = {
    sendChat,
    getAllChats,
    deleteChats,
    markChatAsRead,
    markServiceChatsAsRead
}

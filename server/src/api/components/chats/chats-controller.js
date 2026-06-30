const chatsService = require('./chats-service')
const { getUserName } = require('../users/users-service')
const { errorResponder, errorTypes } = require('../../../core/errors')
const { broadcastToService } = require('../../../core/webSocket');

async function sendChat(req, res, next){
    try {
        const userId = req.user.id
        const { serviceId, message, status, replyTo } = req.body

        if(!message){
            throw errorResponder(errorTypes.EMPTY_BODY, 'No message was sent.')
        }

        const userName = await getUserName(userId)

        const success = await chatsService.sendChat(serviceId, userId, userName, message, status, replyTo)
        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to send message!')
        }

        broadcastToService(serviceId, { type: 'NEW_CHAT', data: success });

        return res.status(201).json(success)
    } catch (error) {
        next(error)
    }
}

async function getAllChats(req, res, next){
    try {
        const serviceId = req.params.serviceId

        const success = await chatsService.getAllChats(serviceId)
        if(!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to get messages.')
        }

        return res.status(200).json(success)
    } catch (error) {
        next(error)
    }
}

async function markChatAsRead(req, res, next){
    try {
        const { chatId, userId, userName } = req.body

        const success = await chatsService.markChatAsRead(chatId, userId, userName)
        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to mark chat as read.')
        }

        res.status(200).json(success)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    sendChat,
    getAllChats
}
const chatsService = require('./chats-service')
const { errorResponder, errorTypes } = require('../../../core/errors');

async function sendChat(req, res, next){
    try {
        const userId = req.user.id
        const { serviceId, message, status } = req.body

        if(!message){
            throw errorResponder(errorTypes.EMPTY_BODY, 'No message was sent.')
        }

        const success = await chatsService.sendChat(serviceId, userId, message, status)
        if (!success){
            throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Failed to send message!')
        }

        return res.status(201).json({ message: 'Message sent!' })
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

module.exports = {
    sendChat,
    getAllChats
}
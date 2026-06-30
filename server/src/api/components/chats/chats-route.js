const express = require('express')
const route = express.Router()
const chatsController = require('./chats-controller')
const authMiddleware = require('../../../core/middlewares/auth')

module.exports = (app) => {
    app.use('/chats', route)

    route.post('/send', authMiddleware, chatsController.sendChat)

    route.post('/read', authMiddleware, chatsController.markChatAsRead)

    route.post('/read-all', authMiddleware, chatsController.markServiceChatsAsRead)

    route.get('/read-status/:id', chatsController.getReadStatus)

    route.get('/:serviceId', chatsController.getAllChats)
}

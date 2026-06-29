module.exports = (db) =>
db.model(
    'Chats',
    db.Schema({
        serviceId: {
            type: db.Schema.Types.ObjectId,
            ref: 'Service',
        }, 
        userId: {
            type: db.Schema.Types.ObjectId,
            ref: 'User',
        },
        userName: String,
        message: String,
        status: {
            type: String,
            default: 'pending',
            enum: ['success', 'pending', 'failed'],
        },
        replyTo: {
            type: {
                chatId: String,
                userId: String,
                userName: String,
                message: String
            },
            default: null
        }
    }, { timestamps : true })
);

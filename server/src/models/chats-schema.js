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
        message: String,
        status: {
            type: String,
            default: 'pending',
            enum: ['confirmed', 'pending', 'declined'],
        },
    }, { timestamps : true })
);

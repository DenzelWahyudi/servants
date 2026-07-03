module.exports = (db) =>
    db.model(
        'Chats',
        db.Schema(
            {
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
                file: {
                    type: {
                        url: String,
                        publicId: String,
                        resourceType: String,
                        format: String,
                        originalName: String,
                        bytes: String,
                    },
                    default: null,
                },
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
                        message: String,
                    },
                    default: null,
                },
                readBy: [
                    {
                        _id: false,
                        userId: {
                            type: db.Schema.Types.ObjectId,
                            ref: 'User',
                        },
                        userName: String,
                    },
                ],
            },
            { timestamps: true }
        )
    );

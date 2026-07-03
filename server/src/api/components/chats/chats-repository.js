const { Chats } = require('../../../models');
const cloudinary = require('../../../core/cloudinary');

async function sendChat(
    serviceId,
    userId,
    userName,
    message,
    file,
    status,
    replyTo
) {
    return Chats.create({
        serviceId,
        userId,
        userName,
        message,
        file,
        status,
        replyTo,
    });
}

async function getAllChats(serviceId) {
    return Chats.find({ serviceId });
}

async function deleteChats(serviceId) {
    const chats = await Chats.find({ serviceId });
    await Promise.allSettled(
        chats
            .filter((c) => c.file?.publicId)
            .map((c) => cloudinary.uploader.destroy(c.file.publicId))
    );
    return Chats.deleteMany({ serviceId });
}

async function markChatAsRead(chatId, userId, userName) {
    return Chats.findOneAndUpdate(
        {
            '_id': chatId,
            'readBy.userId': { $ne: userId },
        },
        {
            $push: { readBy: { userId, userName } },
        },
        { new: true }
    );
}

async function markServiceChatsAsRead(serviceId, userId, userName) {
    const filter = { serviceId, 'readBy.userId': { $ne: userId } };

    const affectedIds = await Chats.find(filter).distinct('_id');
    if (affectedIds.length === 0) return [];

    await Chats.updateMany(filter, { $push: { readBy: { userId, userName } } });

    return Chats.find({ _id: { $in: affectedIds } }).select('_id readBy');
}

module.exports = {
    sendChat,
    getAllChats,
    deleteChats,
    markChatAsRead,
    markServiceChatsAsRead,
};

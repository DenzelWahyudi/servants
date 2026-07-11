const { Users } = require('../../../models');

async function getUser(id) {
    return Users.findById(id);
}

async function getUsers() {
    return Users.find();
}

async function getUserByEmail(email) {
    return Users.findOne({ email });
}

async function getUserByPhoneNumber(phoneNumber) {
    return Users.findOne({ phoneNumber });
}

async function getUserByName(name) {
    return Users.findOne({ name });
}

async function createUser(name, email, phoneNumber, passwordHash, role) {
    return Users.create({ name, email, phoneNumber, passwordHash, role });
}

async function updateEmail(id, email) {
    return Users.updateOne({ _id: id }, { $set: { email } });
}

async function updatePhoneNumber(id, phoneNumber) {
    return Users.updateOne({ _id: id }, { $set: { phoneNumber } });
}

async function updateName(id, name) {
    return Users.updateOne({ _id: id }, { $set: { name } });
}

async function changePassword(id, passwordHash) {
    return Users.updateOne({ _id: id }, { $set: { passwordHash } });
}

async function forgotPassword(phoneNumber, passwordHash) {
    return Users.updateOne({ phoneNumber }, { $set: { passwordHash } });
}

async function deleteUser(id) {
    return Users.deleteOne({ _id: id });
}

async function getUserName(id) {
    const user = await Users.findById(id);
    return user.name;
}

async function savePushToken(id, pushToken) {
    return Users.updateOne({ _id: id }, { $set: { pushToken } });
}

module.exports = {
    getUser,
    getUsers,
    getUserByEmail,
    getUserByPhoneNumber,
    getUserByName,
    createUser,
    updateEmail,
    updatePhoneNumber,
    updateName,
    changePassword,
    forgotPassword,
    deleteUser,
    getUserName,
    savePushToken,
};

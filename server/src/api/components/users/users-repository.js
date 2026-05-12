const { Users } = require('../../../models');

async function getUser(id) {
  return Users.findById(id);
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function getUserByPhoneNumber(phoneNumber) {
  return Users.findOne({ phoneNumber });
}

async function createUser(name, email, phoneNumber, passwordHash, role) {
  return Users.create({ name, email, phoneNumber, passwordHash, role });
}

async function updateUser(id, email, phoneNumber) {
  return Users.updateOne({ _id: id }, { $set: { email, phoneNumber } });
}

async function changePassword(id, passwordHash) {
  return Users.updateOne({ _id: id }, { $set: { passwordHash } });
}

async function deleteUser(id) {
  return Users.deleteOne({ _id: id });
}

async function getUserName(id) {
  const user = await Users.findById(id);
  return user.name;
}

module.exports = {
  getUser,
  getUserByEmail,
  getUserByPhoneNumber,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  getUserName,
};

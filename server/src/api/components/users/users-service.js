const usersRepository = require('./users-repository');

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function getUserByPhoneNumber(phoneNumber) {
  return usersRepository.getUserByPhoneNumber(phoneNumber);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function phoneNumberExists(phoneNumber) {
  const user = await usersRepository.getUserByPhoneNumber(phoneNumber);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(name, email, phoneNumber, passwordHash, role) {
  return usersRepository.createUser(name, email, phoneNumber, passwordHash, role);
}

async function updateUser(id, email, phoneNumber) {
  return usersRepository.updateUser(id, email, phoneNumber);
}

async function changePassword(id, passwordHash) {
  return usersRepository.changePassword(id, passwordHash);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function getUserName(id) {
  return usersRepository.getUserName(id);
}

module.exports = {
  getUser,
  getUserByPhoneNumber,
  emailExists,
  phoneNumberExists,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  getUserName,
};

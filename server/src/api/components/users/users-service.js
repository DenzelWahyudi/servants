const usersRepository = require('./users-repository');

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function getUsers(){
  return usersRepository.getUsers();
}

async function getUserByPhoneNumber(phoneNumber) {
  return usersRepository.getUserByPhoneNumber(phoneNumber);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user;
}

async function phoneNumberExists(phoneNumber) {
  const user = await usersRepository.getUserByPhoneNumber(phoneNumber);
  return !!user;
}

async function nameExists(name) {
  const user = await usersRepository.getUserByName(name);
  return !!user;
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
  getUsers,
  getUserByPhoneNumber,
  emailExists,
  nameExists,
  phoneNumberExists,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  getUserName,
};

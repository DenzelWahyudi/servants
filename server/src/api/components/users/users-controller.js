const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const jwt = require('jsonwebtoken')

async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.user.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function getUsers(request, response, next) {
  try {
    const users = await usersService.getUsers();
    if (!users) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Users not found');
    }

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function createUser(request, response, next) {
  try {
    const {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      confirm_password: confirmPassword,
      role: role
    } = request.body;

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (!phoneNumber) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Phone number is required')
    }

    if (!name) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Full name is required'
      );
    }

    if (await usersService.emailExists(email)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    if (await usersService.phoneNumberExists(phoneNumber)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Phone number already exists'
      );
    }

    if (await usersService.nameExists(name)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Name already exists'
      );
    }

    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }

    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password do not match'
      );
    }

    const hashedPassword = await hashPassword(password);
    
    const success = await usersService.createUser(
      name,
      email,
      phoneNumber,
      hashedPassword,
      role === "admin" ? "admin" : undefined
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateUserEmail(request, response, next) {
  try {
    const { email, password, newEmail } = request.body;

    const user = await usersService.getUser(request.user.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (!newEmail) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'New email is required');
    }

    if (!password){
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
    }

    const isMatch = await passwordMatched(password, user.passwordHash);
    if (!isMatch) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password is incorrect'
      );
    }

    if (await usersService.emailExists(newEmail)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    const success = await usersService.updateUser(
      request.user.id,
      newEmail,
      user.phoneNumber
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user email'
      );
    }

    return response.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateUserPhoneNumber(request, response, next) {
  try {
    const { email, password, newPhoneNumber } = request.body;

    const user = await usersService.getUser(request.user.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (!newPhoneNumber) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'New phone number is required');
    }

    if (!password){
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
    }

    const isMatch = await passwordMatched(password, user.passwordHash);
    if (!isMatch) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password is incorrect'
      );
    }

    if (await usersService.phoneNumberExists(newPhoneNumber)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Phone number already exists'
      );
    }

    const success = await usersService.updateUser(
      request.user.id,
      user.email,
      newPhoneNumber
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user phone number'
      );
    }

    return response.status(200).json({ message: 'Phone number updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function changePassword(request, response, next) {
  try {
    const id = request.user.id;
    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = request.body;

    const user = await usersService.getUser(request.user.id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const isMatch = await passwordMatched(oldPassword, user.passwordHash);
    if (!isMatch) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Old password is incorrect'
      );
    }

    if (newPassword.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }

    if (newPassword === oldPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'The new password must be different from the old password'
      );
    }

    if (newPassword !== confirmNewPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password and new confirm password do not match'
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    const success = await usersService.changePassword(id, hashedPassword);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response.status(200).json({ message: 'Password change succesful!' });
  } catch (error) {
    return next(error);
  }
}

async function deleteUser(request, response, next) {
  try {
    const success = await usersService.deleteUser(request.user.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

async function getUserName(req, res, next){
  try {
    const user = await usersService.getUser(req.user.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const fullName = await usersService.getUserName(req.user.id)
    const userName = fullName ? fullName.trim().split(' ')[0] : ' ';

    return res.status(200).json(userName);
  } catch (error) {
    return next(error)
  }
}

async function geFullName(req, res, next){
  try {
    const user = await usersService.getUser(req.user.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const name = await usersService.getUserName(req.user.id)
    return res.status(200).json(name);
  } catch (error) {
    return next(error)
  }
}

async function login(req, res, next){

  try {
    const {phoneNumber, password} = req.body;
    
    if (!phoneNumber){
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Phone number is required');
    }

    if (!password){
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
    }

    const user = await usersService.getUserByPhoneNumber(phoneNumber);

    if (!user){
      await passwordMatched(password, "$2b$16$H9YjlxIlOV2RmYyEhdXg2ODaGcQz6D4zkkUUnamUi3vrsPSpME0tK");
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid phone number or password');
    }

    const isMatch = await passwordMatched(password, user.passwordHash);
    if (!isMatch) {
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid phone number or password');
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login succesful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function loginAdmin(req, res, next){

  try {
    const {phoneNumber, password} = req.body;
    
    if (!phoneNumber){
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Phone number is required');
    }

    if (!password){
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
    }

    const user = await usersService.getUserByPhoneNumber(phoneNumber);

    if (!user){
      await passwordMatched(password, "$2b$16$H9YjlxIlOV2RmYyEhdXg2ODaGcQz6D4zkkUUnamUi3vrsPSpME0tK");
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid phone number or password');
    }

    if (user.role != "admin"){
      await passwordMatched(password, "$2b$16$H9YjlxIlOV2RmYyEhdXg2ODaGcQz6D4zkkUUnamUi3vrsPSpME0tK");
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid phone number or password');
    }

    const isMatch = await passwordMatched(password, user.passwordHash);
    if (!isMatch) {
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid phone number or password');
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login succesful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function getUserId(request, response, next) {
  try {
    const user = await usersService.getUser(request.user.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user._id);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUserEmail,
  updateUserPhoneNumber,
  changePassword,
  deleteUser,
  getUserName,
  geFullName,
  login,
  loginAdmin,
  getUserId
};

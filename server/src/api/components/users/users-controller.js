const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

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
      throw errorResponder(errorTypes.VALIDATION, 'Email is required');
    }

    if (!phoneNumber) {
      throw errorResponder(errorTypes.VALIDATION, 'Phone number is required')
    }

    if (!name) {
      throw errorResponder(
        errorTypes.VALIDATION,
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
        errorTypes.VALIDATION,
        'Password must be at least 8 characters long'
      );
    }

    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION,
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

async function updateEmail(req, res, next){
  try {
    const id = req.params.id
    const { newEmail } = req.body

    if (!newEmail) {
      throw errorResponder(errorTypes.VALIDATION, 'Email is required');
    }

    if (await usersService.emailExists(newEmail)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    const success = await usersService.updateEmail(id, newEmail)
    if(!success){
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, "Failed to update email")
    }

    return res.status(200).json( { message: "Email updated." })
  } catch (error) {
    next(error)
  }
}

async function updatePhoneNumber(req, res, next){
  try {
    const id = req.params.id
    const { newPhoneNumber } = req.body

    if (!newPhoneNumber) {
      throw errorResponder(errorTypes.VALIDATION, 'Phone number is required')
    }

    if (await usersService.phoneNumberExists(newPhoneNumber)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Phone number already exists'
      );
    }

    const success = await usersService.updatePhoneNumber(id, newPhoneNumber)
    if(!success){
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, "Failed to update phone number")
    }

    return res.status(200).json( { message: "Phone number updated." })
  } catch (error) {
    next(error)
  }
}

async function updateName(req, res, next){
  try {
    const id = req.params.id
    const { newName } = req.body

    if (!newName) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'Full name is required'
      );
    }

    if (await usersService.nameExists(newName)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Name already exists'
      );
    }

    const success = await usersService.updateName(id, newName)
    if(!success){
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, "Failed to update name")
    }

    return res.status(200).json( { message: "Name updated." })
  } catch (error) {
    next(error)
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
        errorTypes.VALIDATION,
        'Old password is incorrect'
      );
    }

    if (newPassword.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'Password must be at least 8 characters long'
      );
    }

    if (newPassword === oldPassword) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'The new password must be different from the old password'
      );
    }

    if (newPassword !== confirmNewPassword) {
      throw errorResponder(
        errorTypes.VALIDATION,
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
    const success = await usersService.deleteUser(request.params.id);

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

async function login(req, res, next){

  try {
    const {phoneNumber, password} = req.body;
    
    if (!phoneNumber){
      throw errorResponder(errorTypes.VALIDATION, 'Phone number is required');
    }

    if (!password){
      throw errorResponder(errorTypes.VALIDATION, 'Password is required');
    }

    const user = await usersService.getUserByPhoneNumber(phoneNumber);

    if (!user){
      await passwordMatched(password, await hashPassword("this is a decoy password"));
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
      throw errorResponder(errorTypes.VALIDATION, 'Phone number is required');
    }

    if (!password){
      throw errorResponder(errorTypes.VALIDATION, 'Password is required');
    }

    const user = await usersService.getUserByPhoneNumber(phoneNumber);

    if (!user){
      await passwordMatched(password, await hashPassword("this is a decoy password"));
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Invalid phone number or password');
    }

    if (user.role !== "admin"){
      await passwordMatched(password, await hashPassword("this is a decoy password"));
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

async function sendOTP(req, res, next){
  try {
    const { phone } = req.body;

    const success = await client.verify.v2.services(SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });

    res.status(200).json(success)
  } catch (error) {
    next(error);
  }
}

async function verifyOTP(req, res, next){
  try {
    const { phone, code } = req.body;
    const result = await client.verify.v2.services(SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (result.status !== 'approved'){
      throw errorResponder(errorTypes.VALIDATION, "Wrong Code!")
    }

    res.status(200).json({ message: "Verified!" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateEmail,
  updatePhoneNumber,
  updateName,
  changePassword,
  deleteUser,
  getUserName,
  login,
  loginAdmin,
  getUserId,
  sendOTP,
  verifyOTP
};

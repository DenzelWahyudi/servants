const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');

async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
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

    const user = await usersService.getUser(request.params.id);

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
      request.params.id,
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

    const user = await usersService.getUser(request.params.id);

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
      request.params.id,
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
    const { id } = request.params;
    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = request.body;

    const user = await usersService.getUser(request.params.id);
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
    const user = await usersService.getUser(req.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const name = await usersService.getUserName(req.params.id)
    return res.status(200).json(name);
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getUser,
  createUser,
  updateUserEmail,
  updateUserPhoneNumber,
  changePassword,
  deleteUser,
  getUserName,
};

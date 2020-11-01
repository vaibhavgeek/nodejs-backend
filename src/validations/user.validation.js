const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    dob: Joi.string(),
    role: Joi.string().valid('user', 'admin'),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    bike: Joi.string(),
    purpose: Joi.string(),
    image: Joi.string(),
    weight: Joi.string(),
    height: Joi.string(),
    mobile: Joi.string(),
    brand: Joi.string(),
    city: Joi.string(),
    location: Joi.string(),
    department: Joi.string(),
    device_info: Joi.object(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string(),
    dob: Joi.string(),
    role: Joi.string().valid('user', 'admin'),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    bike: Joi.string(),
    purpose: Joi.string(),
    image: Joi.string(),
    weight: Joi.string(),
    height: Joi.string(),
    mobile: Joi.string(),
    brand: Joi.string(),
    city: Joi.string(),
    location: Joi.string(),
    department: Joi.string(),
    device_info: Joi.object(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    gear: Joi.object(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getUserByEmail = {
  params: Joi.object().keys({
    email: Joi.string().email(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
      dob: Joi.string(),
      role: Joi.string().valid('user', 'admin'),
      gender: Joi.string().valid('Male', 'Female', 'Other'),
      bike: Joi.string(),
      purpose: Joi.string(),
      image: Joi.string(),
      weight: Joi.string(),
      height: Joi.string(),
      mobile: Joi.string(),
      brand: Joi.string(),
      city: Joi.string(),
      location: Joi.string(),
      department: Joi.string(),
      device_info: Joi.object(),
      gear: Joi.object(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getCityByName  = {
  params: Joi.object().keys({
    city: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getCityByName,
};

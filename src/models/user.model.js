const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true, // used by the toJSON plugin
  },
  gender: {
    type: String,
  },
  mobile: {
    type: String,
  },
  city: {
    type: String,
  },
  location: {
    type: String,
  },
  dob: {
    type: Number,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  bike: {
    type: String,
  },
  purpose: {
    type: String,
  },
  referral: {
    type: String,
  },
  image: {
    type: String,
  },
  brand: {
    type: String,
  },
  department: {
    type: String,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  deviceInfo: {
    type: Object,
  },
  blocked: {
    type: Boolean,
    default: false
  },
  gear: {
    type: Object,
    properties: {
      gear: {
        type: String,
      },
      frontGear: {
        type: String,
      },
      rearGear: {
        type: String,
      },
      remainingTrips: {
        type: String,
      },
      remainingDistance: {
        type: String,
      },
    },
  },
  createdAtEpoch: {
    type: Number,
    default: new Date().getTime(),
  },
},
{
  timestamps: true,
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;

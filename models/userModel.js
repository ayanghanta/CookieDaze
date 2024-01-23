const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Pleace provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please eprovide a valid email'],
  },
  passwordChangeAt: {
    type: Date,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be grater or queal to 8 character'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please comfirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'confirm password must be same as password',
    },
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'restaurant-owner'],
      massage: ' role only either user or restaurant owner',
    },
    default: 'user',
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenAt: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// QUERY MIDDLEWARES

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// DOCUMENT MIDDLEWARES

// hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// set the password chage time
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

// INSTANCE METHODS

userSchema.methods.checkCorrectPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.passwordChangeAfter = function (tokenIssuTime) {
  if (this.passwordChangeAt) {
    const passwordChangeTime = this.passwordChangeAt.getTime() / 1000;
    return tokenIssuTime < passwordChangeTime;
    // return  // 100<200
  }

  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetTokenAt = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

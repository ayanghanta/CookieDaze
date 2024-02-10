const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sharp = require('sharp');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const Email = require('./../utils/mail');

const singToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP_TIME,
  });
};

exports.resizeuserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.body.photo = `user-${req.body.email}-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.body.photo}`);

  next();
});

const createTokenAndSend = function (user, statusCode, res, sendUser = false) {
  const token = singToken(user._id);
  // sending jwt via Cookie
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000),
    secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'development') options.secure = false;
  res.cookie('jwt', token, options);

  const data = {};
  if (sendUser) data.user = user;

  res.status(statusCode).json({
    status: 'success',
    ok: true,
    token,
    data,
  });
};

exports.singup = catchAsync(async function (req, res, nest) {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo,
    passwordChangeAt: req.body.passwordChangeAt,
    role: req.body.role,
  });

  // resctrict to send password in responce
  newUser.password = undefined;

  createTokenAndSend(newUser, 201, res, true);
});

exports.login = catchAsync(async function (req, res, next) {
  // 1) find the user on provided email
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('pleace provide your email and password !', 401));

  // 2) validate the password
  const currentUser = await User.findOne({ email }).select('+password');

  if (
    !currentUser ||
    !(await currentUser.checkCorrectPassword(password, currentUser.password))
  )
    return next(
      new AppError('Either email or passowrd is wrong, try with correct one', 401)
    );
  createTokenAndSend(currentUser, 200, res);
});

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    ok: true,
  });
};

exports.protect = catchAsync(async function (req, res, next) {
  // 1)get the token form the request header
  let token = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) return next(new AppError('pleace login to access', 401));
  // 2) validate the token
  const decodeToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check the user is still exist or  not
  const user = await User.findOne({ _id: decodeToken.id });

  if (!user)
    return next(
      new AppError('Token belog to the user is not exist any more , singup pleace', 404)
    );
  // 4) check if the user is changed his password or not
  if (user.passwordChangeAfter(decodeToken.iat))
    return next(
      new AppError('user recently change the password . please login again !', 401)
    );

  // get access to the protected rout
  req.user = user;
  res.locals.user = user;
  next();
});

exports.isLoggededIn = async function (req, res, next) {
  if (!req.cookies.jwt) return next();
  try {
    const token = req.cookies.jwt;

    if (!token) return next();
    // 2) validate the token
    const decodeToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) check the user is still exist or  not
    const user = await User.findOne({ _id: decodeToken.id });

    if (!user) return next();
    // 4) check if the user is changed his password or not
    if (user.passwordChangeAfter(decodeToken.iat)) return next();

    // THERE IS A LOGGED IN USER
    res.locals.user = user;
    next();
  } catch (err) {
    return next();
  }
};

exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`you didn't have premission to do this operation`, 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async function (req, res, next) {
  // 1) get the email form the request body
  const { email } = req.body;
  if (!email) return next(new AppError('Pleace provide your email', 400));

  // 2) check is any user with this emial is exist or not
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('user with this email is not exist', 404));

  // 3) genarate a reset token
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
  // const message = `Reset Your Password by ${resetURL}- Click the link in your email to reset within 10 min. Ignore if not requested`;
  // 4) send Email
  try {
    await new Email(user, resetURL).sendRestPassword();
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenAt = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('something went wrong to sending email! try again later', 500)
    );
  }

  res.status(200).json({
    status: 'success',
    ok: true,
    message: 'Resest token is send to your mail',
  });
});

exports.resetPassword = catchAsync(async function (req, res, next) {
  // 1) get the user form ther restPassword token
  const resetHashedToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  // 2) cheak if the token is exipre or not
  const user = await User.findOne({
    passwordResetToken: resetHashedToken,
    passwordResetTokenAt: { $gt: Date.now() },
  });

  if (!user)
    return next(new AppError('Token is either invalid or expire . try again', 400));

  // 3) reset the password with the new password and delete reset toke and its time step
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetTokenAt = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  // login the user

  createTokenAndSend(user, 201, res, true);
});

exports.updatePassword = catchAsync(async function (req, res, next) {
  //  get the user form the req.user
  const user = await User.findById(req.user._id).select('+password');
  // compare the passwords
  if (!(await user.checkCorrectPassword(req.body.oldPassword, user.password)))
    return next(new AppError('Enter your current password corectly !', 400));
  // updataing the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createTokenAndSend(user, 200, res);
});

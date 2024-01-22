const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const factory = require('./factoryFunction');

const filterObj = function (obj, ...fileds) {
  const filterObj = {};
  Object.keys(obj).forEach((key) => {
    if (fileds.includes(key)) filterObj[key] = obj[key];
  });
  return filterObj;
};

exports.updateMe = catchAsync(async function (req, res, next) {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This rout is not for updating the password.Use /updatePassword ,',
        400
      )
    );
  const updateObj = filterObj(req.body, 'name', 'email', 'photo');
  const updatedUser = await User.findByIdAndUpdate(req.user._id, updateObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    ok: true,
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async function (req, res, next) {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: 'success',
    ok: true,
    user: null,
  });
});

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
// Do NOT UPDATE USER PASSWORD USING THIS ROUT [ONLY FOR ADMIN]
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);

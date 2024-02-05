const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const factory = require('./factoryFunction');

const multerStorage = multer.memoryStorage(); // save file in memory as buffer

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Pleace uplode image :/', 400), false);
  }
};

const uplode = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = uplode.single('photo');

exports.resizeuserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

const filterObj = function (obj, ...fileds) {
  const filterObj = {};
  Object.keys(obj).forEach((key) => {
    if (fileds.includes(key)) filterObj[key] = obj[key];
  });
  return filterObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
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
  if (req.file) updateObj.photo = req.file.filename;
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

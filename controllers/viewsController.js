const Cake = require('./../models/cakeModel');
const Cart = require('./../models/cartModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getSingup = (req, res) => {
  res
    .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
    .status(200)
    .render('singup', {
      title: `Let's Bake Memories Together!`,
      user: req.user,
    });
};

exports.getOverview = catchAsync(async function (req, res, next) {
  const cakes = await Cake.find();
  res
    .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
    .status(200)
    .render('overview', {
      title: 'Wholesome Cake Joy',
      cakes,
    });
});

exports.getCake = catchAsync(async function (req, res, next) {
  const cake = await Cake.findOne({ slug: req.params.cakeSlug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  // console.log(cake);
  if (!cake) return next(new AppError('This cake is not found in our DB', 404));
  res
    .status(200)
    .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
    .render('cake', {
      title: `${cake.name}`,
      cake,
    });
});

exports.getAccount = (req, res) => {
  res
    .status(200)
    .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
    .render('account', {
      title: 'Your Account',
    });
};

exports.getBilling = catchAsync(async (req, res) => {
  const cartItems = await Cart.find({ user: req.user._id }).populate({
    path: 'cake',
    select: 'name weight price coverImage flavour',
  });
  res
    .status(200)
    .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
    .render('billing', {
      title: 'Your cart',
      cartItems,
    });
});

exports.getResetPassword = (req, res) => {
  const token = req.params.passwordResetToken;
  res
    .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
    .status(200)
    .render('resetPassword', {
      title: 'Reset your password',
      token,
    });
};

const Cake = require('./../models/cakeModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async function (req, res, next) {
  const cakes = await Cake.find();
  res
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
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
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('cake', {
      title: `${cake.name}`,
      cake,
    });
});

exports.getAccount = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('account', {
      title: 'Your Account',
    });
};

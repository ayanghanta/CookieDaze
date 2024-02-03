const Cake = require('./../models/cakeModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async function (req, res, next) {
  const cakes = await Cake.find();
  res.status(200).render('overview', {
    cakes,
  });
});

exports.getCake = catchAsync(async function (req, res, next) {
  const cake = await Cake.findOne({ slug: req.params.cakeSlug });
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('cake', {
      cake,
    });
});

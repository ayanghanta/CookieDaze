const Cake = require('./../models/cakeModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async function (req, res) {
  const cakes = await Cake.find();
  res.status(200).render('overview', {
    cakes,
  });
});

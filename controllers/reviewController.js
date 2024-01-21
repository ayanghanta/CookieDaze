const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(async function (req, res, next) {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    ok: true,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async function (req, res, next) {
  const review = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    ok: true,
    data: {
      review,
    },
  });
});

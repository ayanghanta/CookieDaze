const Review = require('./../models/reviewModel');
const factory = require('./factoryFunction');
// const catchAsync = require('./../utils/catchAsync');

exports.setUserCakeId = (req, res, next) => {
  if (!req.body.cake) req.body.cake = req.params.cakeId;
  req.body.user = req.user._id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

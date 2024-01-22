const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review can not be empty'],
    },
    rating: {
      type: Number,
      max: [5, 'rating can not be grater then 5.0'],
      min: [1, 'rating can not be less then 1.0'],
      default: 2.5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    cake: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'review must be belong to a cake'],
      ref: 'Cake',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'review must be belong to a user'],
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VALTUAL PROPARTY

//  QUERY MODDLEWARES

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

const mongoose = require('mongoose');
const Cake = require('./cakeModel');

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
      ref: 'Cakes',
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

// INDEXING

//preventing duplicate review
reviewSchema.index({ user: -1, cake: 1 }, { unique: true });

// STATIC METHOD
reviewSchema.statics.calcRatings = async function (cakeId) {
  const ratingStats = await this.aggregate([
    {
      $match: { cake: cakeId },
    },
    {
      $group: {
        _id: null,
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(ratingStats);
  if (ratingStats.length > 0) {
    await Cake.findByIdAndUpdate(cakeId, {
      ratingAvarage: ratingStats[0].avgRating,
      ratingQuantity: ratingStats[0].numRating,
    });
  } else {
    await Cake.findByIdAndUpdate(cakeId, {
      ratingAvarage: 4.5,
      ratingQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function (doc) {
  this.constructor.calcRatings(doc.cake);
});

// findByIdAndUpdate
// findByIdAndDelete

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) await doc.constructor.calcRatings(doc.cake);
});

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

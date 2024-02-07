const mongoose = require('mongoose');
const Cake = require('./cakeModel');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'To add product in a cart userId is needed'],
      ref: 'User',
    },
    cake: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'this filed must be belong to a cake'],
      ref: 'Cakes',
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, 'quantity can not be less then 1'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.virtual('totoalPrice').get(function () {
  return this.quantity * this.cake.price;
});

// QUERY MIDDLEWARWE
// cartSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });
// DOCUMENT MIDDLEWARWE
cartSchema.pre('save', function (next) {
  if (this.quantity === 0) this.quantity = 1;
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

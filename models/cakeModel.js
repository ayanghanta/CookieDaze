const mongoose = require('mongoose');
const slugify = require('slugify');

const CakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'A cake must have a name'],
      minlenght: [3, 'cake must have a name grater the 3 character'],
    },
    weight: {
      type: String,
      required: [true, 'cake must have a waight'],
    },
    price: {
      type: Number,
      required: [true, 'cake must have a price value'],
    },
    ratingAvarage: {
      type: Number,
      default: 4,
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
      required: [true, 'cake must have a Cover image'],
    },
    ortherImages: [String],
    flavour: {
      type: String,
      require: true,
    },
    shape: {
      type: String,
    },
    type_of_cake: {
      type: String,
      default: 'cream',
    },
    toppings: [String],
    origin: {
      type: String,
      default: 'India',
    },
    Box_contains: {
      type: String,
      default:
        'Cake, candle and knife will be delivered as per the availability.',
    },
    specialty: [String],
    description: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CakeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'cake',
  localField: '_id',
});

CakeSchema.pre('save', function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Cakes = mongoose.model('Cakes', CakeSchema);

module.exports = Cakes;

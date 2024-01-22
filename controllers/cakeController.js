const Cakes = require('./../models/cakeModel');
const APIfeature = require('./../utils/apiFeature');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./factoryFunction');
// const AppError = require('./../utils/appError');

exports.getAllCakes = factory.getAll(Cakes);
exports.getCake = factory.getOne(Cakes, { path: 'reviews' });
exports.createCake = factory.createOne(Cakes);
exports.updateCake = factory.updateOne(Cakes);
exports.deleteCake = factory.deleteOne(Cakes);

// AGGREGATION

exports.cakeByFlavor = catchAsync(async function (req, res, next) {
  const cakes = await Cakes.aggregate([
    {
      $group: {
        _id: '$flavour',
        cakes_name: { $push: '$name' },
        cakes_id: { $push: '$_id' },
      },
    },
    {
      $addFields: { flavour: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  res.status(200).json({
    ok: true,
    results: cakes.length,
    data: {
      cakes,
    },
  });
});

exports.cakeByCategory = catchAsync(async function (req, res, next) {
  const categories = await Cakes.aggregate([
    {
      $unwind: '$specialty',
    },
    {
      $group: {
        _id: '$specialty',
        cakes_name: { $push: '$name' },
        cakes_id: { $push: '$_id' },
      },
    },
    {
      $addFields: { category: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  res.status(200).json({
    ok: true,
    results: categories.length,
    data: {
      categories,
    },
  });
});

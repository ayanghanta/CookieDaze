const Cakes = require('./../models/cakeModel');
const APIfeature = require('./../utils/apiFeature');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllCakes = catchAsync(async function (req, res, next) {
  const features = new APIfeature(Cakes.find(), req.query)
    .filtering()
    .sorting()
    .limiting()
    .paginate();
  const cakes = await features.query;
  res.status(200).json({
    ok: true,
    results: cakes.length,
    data: {
      cakes,
    },
  });
});

exports.getCake = catchAsync(async function (req, res, next) {
  const cake = await Cakes.findById(req.params.id);
  // if (!cake) return next(new AppError('Id fot found ', 404));
  res.status(200).json({
    ok: true,
    data: {
      cake,
    },
  });
});

exports.createCake = catchAsync(async function (req, res, next) {
  const cake = await Cakes.create(req.body);

  res.status(201).json({
    ok: true,
    data: {
      cake,
    },
  });
});

exports.updateCake = catchAsync(async function (req, res, next) {
  const updatedCake = await Cakes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    ok: true,
    data: {
      cake: updatedCake,
    },
  });
});

exports.deleteCake = catchAsync(async function (req, res, next) {
  const cake = await Cakes.findByIdAndDelete(req.params.id);
  if (!cake) return next(new AppError('Id fot found ', 404));
  res.status(204).json({
    ok: true,
    massage: 'Cake deleted !',
  });
});

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

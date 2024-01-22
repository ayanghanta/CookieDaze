const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIfeature = require('./../utils/apiFeature');

exports.createOne = function (Model) {
  return catchAsync(async function (req, res, next) {
    const doc = await Model.create(req.body);

    res.status(201).json({
      ok: true,
      data: {
        doc,
      },
    });
  });
};

exports.updateOne = function (Model) {
  return catchAsync(async function (req, res, next) {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document find with this ID', 404));

    res.status(201).json({
      ok: true,
      data: {
        data: doc,
      },
    });
  });
};

exports.deleteOne = function (Model) {
  return catchAsync(async function (req, res, next) {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document find with this ID', 404));

    res.status(204).json({
      ok: true,
      massage: 'document deleted !',
    });
  });
};

exports.getOne = function (Model, populateOptions) {
  return catchAsync(async function (req, res, next) {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    if (!doc) return next(new AppError('No document find with this ID', 404));

    res.status(200).json({
      ok: true,
      data: {
        data: doc,
      },
    });
  });
};

exports.getAll = function (Model) {
  return catchAsync(async function (req, res, next) {
    // to allow nested all request on cake
    let filter = {};
    if (req.params.cakeId) filter = { cake: req.params.cakeId };

    const features = new APIfeature(Model.find(filter), req.query)
      .filtering()
      .sorting()
      .limiting()
      .paginate();
    const doc = await features.query;
    res.status(200).json({
      ok: true,
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
};

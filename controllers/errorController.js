const AppError = require('./../utils/appError');

const sendErrorDev = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    ok: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = function (err, res) {
  if (err.isOperational) {
    console.log(err.message);
    res.status(err.statusCode).json({
      status: err.status,
      ok: false,
      message: err.message,
    });
  } else {
    // Programming or orther  error: don't leak error details
    // console.log('ERROR 🍒', err);
    res.status(500).json({
      status: 'fail',
      ok: false,
      message: 'Some thing went wrong !',
    });
  }
};

const handleCastErrorDB = function (err) {
  const message = `Invaid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateKeyErrorDB = function (err) {
  const value = Object.values(err.keyValue);
  const message = `Duplicate value: ${err.keyValue.name}. Try with another`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = function (err) {
  const message = Object.values(err.errors)
    .map((el) => el.message)
    .join('. ');
  return new AppError(message, 400);
};

const handleInvalidJwt = () =>
  new AppError('Invalid token. Please login to access the data', 401);

const handleExpireJwt = () =>
  new AppError('Expire token. Please login to access the data', 401);

module.exports = (err, req, res, next) => {
  err.status = err.status || 'fail';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateKeyErrorDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleInvalidJwt();
    if (err.name === 'TokenExpiredError') error = handleExpireJwt();
    sendErrorProd(err, res);
  }
};

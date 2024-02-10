const AppError = require('./../utils/appError');

const sendErrorDev = function (req, res, err) {
  // A) for api
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      ok: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  // for webpage
  return res
    .status(err.statusCode)
    .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
    .render('error', {
      title: `${err.statusCode} Error`,
      msg: err.message,
    });
};

const sendErrorProd = function (req, res, err) {
  if (err.isOperational) {
    if (req.originalUrl.startsWith('/api')) {
      console.log('ERROR 🍒', err);
      return res.status(err.statusCode).json({
        status: err.status,
        ok: false,
        message: err.message,
      });
    }
    return res
      .status(err.statusCode)
      .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
      .render('error', {
        title: `${err.statusCode} Error`,
        msg: err.message,
      });
  } else {
    // 🔽| Programming or orther  error: don't leak error details
    if (req.originalUrl.startsWith('/api')) {
      console.log('ERROR 🍒', err);
      return res.status(500).json({
        status: 'fail',
        ok: false,
        message: 'Some thing went wrong !',
      });
    }
    return res
      .status(err.statusCode)
      .set('Content-Security-Policy', "connect-src 'self' https://cdnjs.cloudflare.com")
      .render('error', {
        title: `${err.statusCode} Error`,
        msg: 'Something Broken',
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
    sendErrorDev(req, res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateKeyErrorDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleInvalidJwt();
    if (err.name === 'TokenExpiredError') error = handleExpireJwt();
    sendErrorProd(req, res, err);
  }
};

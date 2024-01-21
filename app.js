const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const cakeRouter = require('./routes/cakeRouts');
const userRouter = require('./routes/userRouts');
const reviewRouts = require('./routes/reviewRouts');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//GLOBAL MIDDLE WARES
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Set sucurity headers
app.use(helmet());
// body parser
app.use(express.json({ limit: '10kb' }));

//  protect againsht NoSQL injections
app.use(mongoSanitize());

// protect form XSS attact
app.use(xssClean());

// prevent form http parameter pollution

app.use(
  hpp({
    whitelist: [
      'weight',
      'price',
      'ratingAvarage',
      'ratingQuantity',
      'flavour',
    ],
  })
);

// ROUTES
app.use('/api/v1/cakes', cakeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouts);

// Handeling error

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in the server !`, 404));
});

// GLOBAL ERROR HANDLE MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;

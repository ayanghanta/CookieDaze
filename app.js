const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const cakeRouter = require('./routes/cakeRouts');
const userRouter = require('./routes/userRouts');
const reviewRouts = require('./routes/reviewRouts');
const viewRouter = require('./routes/viewRouts');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//GLOBAL MIDDLE WARES
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Set sucurity headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      scriptSrc: ["'self'", 'https://*.cloudflare.com'],
      scriptSrc: ["'self'", 'https://*.stripe.com'],
      scriptSrc: ["'self'", 'http:', 'https://*.mapbox.com', 'data:'],
      frameSrc: ["'self'", 'https://*.stripe.com'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'https:', 'unsafe-inline'],
      workerSrc: ["'self'", 'data:', 'blob:'],
      childSrc: ["'self'", 'blob:'],
      imgSrc: ["'self'", 'data:', 'blob:'],
      connectSrc: ["'self'", 'blob:', 'https://*.mapbox.com'],
      upgradeInsecureRequests: [],
    },
  })
);
// body parser
app.use(express.json({ limit: '10kb' }));
// cookie parser
app.use(cookieParser());

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

app.use('/', viewRouter);
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

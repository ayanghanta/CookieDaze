const express = require('express');

const authController = require('./../controllers/authController');
const paymentController = require('./../controllers/paymentController');

const router = express.Router();

router.get(
  '/payment-session/:userId',
  authController.protect,
  paymentController.getPaymentSession
);

module.exports = router;

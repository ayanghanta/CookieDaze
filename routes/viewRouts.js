const express = require('express');
const authController = require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router.get('/', authController.isLoggededIn, viewsController.getOverview);

router.get('/cake/:cakeSlug', authController.isLoggededIn, viewsController.getCake);

router.get('/me', authController.protect, viewsController.getAccount);
router.get('/cart', authController.protect, viewsController.getBilling);
router.get('/resetPassword/:passwordResetToken', viewsController.getResetPassword);

module.exports = router;

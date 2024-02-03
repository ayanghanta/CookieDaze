const express = require('express');
const authController = require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router.use(authController.isLoggededIn);

router.route('/').get(viewsController.getOverview);

router.route('/cake/:cakeSlug').get(viewsController.getCake);

module.exports = router;

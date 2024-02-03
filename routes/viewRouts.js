const express = require('express');

const router = express.Router();

const viewsController = require('./../controllers/viewsController');

router.route('/').get(viewsController.getOverview);

router.route('/cake/:cakeSlug').get(viewsController.getCake);

module.exports = router;

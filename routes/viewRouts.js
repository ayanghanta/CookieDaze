const express = require('express');

const router = express.Router();

const viewsController = require('./../controllers/viewsController');

router.route('/').get(viewsController.getOverview);

module.exports = router;

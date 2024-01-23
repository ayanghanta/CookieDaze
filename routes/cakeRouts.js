const express = require('express');

const cakeController = require('./../controllers/cakeController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./reviewRouts');

const router = express.Router();

// GET cakes/8763y/reviews/
router.use('/:cakeId/reviews', reviewRouter);

router.route('/flavors').get(cakeController.cakeByFlavor);
router.route('/categories').get(cakeController.cakeByCategory);
router
  .route('/')
  .get(cakeController.getAllCakes)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'restaurant-owner'),
    cakeController.createCake
  );

router
  .route('/:id')
  .get(cakeController.getCake)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'restaurant-owner'),
    cakeController.updateCake
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'restaurant-owner'),
    cakeController.deleteCake
  );

module.exports = router;

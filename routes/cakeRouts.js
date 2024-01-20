const express = require('express');

const cakeController = require('./../controllers/cakeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/flavors').get(cakeController.cakeByFlavor);
router.route('/categories').get(cakeController.cakeByCategory);
router
  .route('/')
  .get(authController.protect, cakeController.getAllCakes)
  .post(cakeController.createCake);

router
  .route('/:id')
  .get(cakeController.getCake)
  .patch(cakeController.updateCake)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'restaurant-owner'),
    cakeController.deleteCake
  );

module.exports = router;

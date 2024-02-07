const express = require('express');

const authController = require('./../controllers/authController');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router.use(authController.protect);

router.get('/', cartController.getCartItems);
router.post('/:cakeId', cartController.setCakeId, cartController.addToCart);
router.patch('/addOne/:id', cartController.addOneItem);
router.patch('/removeOne/:id', cartController.removeOneItem);
router.delete('/removeItems/:id', cartController.deleteCart);

module.exports = router;

const express = require('express');

const authController = require('./../controllers/authController');
const userContoller = require('./../controllers/userController');

const router = express.Router();

router.post('/singup', authController.singup);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userContoller.updateMe);
router.delete('/deleteMe', authController.protect, userContoller.deleteMe);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userContoller.getAllUsers
  );

module.exports = router;

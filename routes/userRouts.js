const express = require('express');

const authController = require('./../controllers/authController');
const userContoller = require('./../controllers/userController');

const router = express.Router();

router.post(
  '/singup',
  userContoller.uploadUserPhoto,
  authController.resizeuserPhoto,
  authController.singup
);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPassword);

// PROTECT ALL BELOW-ROUTS
router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);
router.get('/Me', userContoller.getMe, userContoller.getUser);

router.patch(
  '/updateMe',
  userContoller.uploadUserPhoto,
  userContoller.resizeuserPhoto,
  userContoller.updateMe
);
router.delete('/deleteMe', userContoller.deleteMe);

//  ONLY USE BY ADMIN
router.use(authController.restrictTo('admin'));

router.route('/').get(userContoller.getAllUsers);
router
  .route('/:id')
  .get(userContoller.getUser)
  .patch(userContoller.updateUser)
  .delete(userContoller.deleteUser);

module.exports = router;

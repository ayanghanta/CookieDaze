const catchAsync = require('./../utils/catchAsync');
const Cart = require('./../models/cartModel');
const factory = require('./factoryFunction');

exports.setCakeId = (req, res, next) => {
  if (!req.body.cake) req.body.cake = req.params.cakeId;
  req.body.user = req.user._id;
  next();
};
exports.addToCart = catchAsync(async (req, res, next) => {
  const cake = await Cart.find({ cake: req.body.cake, user: req.user._id });

  // 2) NO cake in the cart- create a new document
  if (cake.length === 0) {
    const cartItem = await Cart.create(req.body);
    return res.status(201).json({
      status: 'success',
      ok: true,
      data: cartItem,
    });
  }
  // 1) YES - then update the document(increase the product quantity)
  const newQuantity = cake[0].quantity + 1;
  const cartItem = await Cart.findByIdAndUpdate(
    cake[0]._id,
    { quantity: newQuantity },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(201).json({
    status: 'success',
    ok: true,
    data: cartItem,
  });
});

exports.getCartItems = catchAsync(async (req, res, next) => {
  const items = await Cart.find({ user: req.user._id }).populate({
    path: 'cake',
    select: 'name weight price coverImage flavour',
  });

  res.status(200).json({
    status: 'success',
    ok: true,
    data: items,
  });
});

const changeItemQuantity = async (req, res, value) => {
  const cartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { $inc: { quantity: value } },
    {
      new: true,
    }
  );
  // NOTEME: $inc will bypass the validetors even {runvalidators:true}
  await cartItem.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    ok: true,
    data: cartItem,
  });
};

exports.addOneItem = catchAsync(async (req, res, next) => {
  await changeItemQuantity(req, res, 1);
});
exports.removeOneItem = catchAsync(async (req, res, next) => {
  await changeItemQuantity(req, res, -1);
});

exports.deleteCart = factory.deleteOne(Cart);

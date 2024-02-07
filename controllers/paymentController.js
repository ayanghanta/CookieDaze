const stripe = require('stripe')(process.env.STRIPE_KEY);
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cart = require('./../models/cartModel');

exports.getPaymentSession = catchAsync(async (req, res, next) => {
  const allItems = await Cart.find({ user: req.params.userId }).populate({
    path: 'cake',
    select: 'name weight price coverImage flavour',
  });

  const iteamArray = allItems.map((item) => {
    return {
      price_data: {
        currency: 'INR',
        product_data: {
          name: item.cake.name,
          images: ['https://cookiedaze.netlify.app/img/falvoured%20cake/vanillaCake.jpg'],
        },
        unit_amount: item.cake.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: iteamArray,
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.user.id,
  });

  res.status(200).json({
    staus: 'success',
    ok: true,
    session,
  });
});

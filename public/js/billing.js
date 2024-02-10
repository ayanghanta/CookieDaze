const cards = document.querySelector('.item_cards--cart');
const stripe = Stripe(
  'pk_test_51OgjQiSFnuZkXGiiD2NuQI6ecV3IUOEisrRyX5UIdBaYoTVKzFpodnouYoMjY9f0B4FuV31s9UnqabQCHijXrcGG00h5330gEJ'
);

const itemControl = async (method, route, cartId) => {
  try {
    if (method == 'patch') {
      const res = await axios.patch(`/api/v1/cart/${route}/${cartId}`);
    } else {
      const res = await axios.delete(`/api/v1/cart/${route}/${cartId}`);
    }
    location.reload(true);
  } catch (err) {
    console.log(err);
  }
};

cards.addEventListener('click', async (e) => {
  if (e.target.closest('.quantity_btn--add')) {
    const cartId = e.target.closest('.quantity_btn--add').dataset.cart;
    await itemControl('patch', 'addOne', cartId);

    //
  } else if (e.target.closest('.quantity_btn--remove')) {
    const cartId = e.target.closest('.quantity_btn--remove').dataset.cart;
    await itemControl('patch', 'removeOne', cartId);

    //
  } else if (e.target.closest('.delete_item_btn')) {
    const cartId = e.target.closest('.delete_item_btn').dataset.cart;
    await itemControl('delete', 'removeItems', cartId);

    //
  }
});

// Stripre
const orderPlaceBtn = document.querySelector('.order_place-btn');

const orderPlace = async (userId) => {
  try {
    const session = await axios.get(`/api/v1/payment/payment-session/${userId}`);
    // console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

if (orderPlaceBtn) {
  orderPlaceBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { userId } = e.target.dataset;
    orderPlace(userId);
  });
}

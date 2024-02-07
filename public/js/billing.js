const cards = document.querySelector('.item_cards--cart');

const itemControl = async (method, route, cartId) => {
  try {
    if (method == 'patch') {
      const res = await axios.patch(
        `http://127.0.0.1:3000/api/v1/cart/${route}/${cartId}`
      );
    } else {
      const res = await axios.delete(
        `http://127.0.0.1:3000/api/v1/cart/${route}/${cartId}`
      );
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

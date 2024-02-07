const addtoCartBtn = document.querySelector('.Add-to-cart');

if (addtoCartBtn) {
  addtoCartBtn.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const cakeId = addtoCartBtn.dataset.id;
      const res = await axios.post(`http://127.0.0.1:3000/api/v1/cart/${cakeId}`);
      showAlert('Item is added to your cart!', 'success');
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  });
}

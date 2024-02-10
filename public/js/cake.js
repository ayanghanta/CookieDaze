const addtoCartBtn = document.querySelector('.Add-to-cart');

if (addtoCartBtn) {
  addtoCartBtn.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const cakeId = addtoCartBtn.dataset.id;
      const res = await axios.post(`/api/v1/cart/${cakeId}`);
      showAlert('Item is added to your cart!', 'success');
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  });
}

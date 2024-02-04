const logoutBtn = document.querySelector('.btn-logout');

const logout = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:3000/api/v1/users/logout');
    // reload the page
    location.reload(true);
    location.assign('/');
  } catch (err) {
    showAlert(err.response.data.message, 'error');
  }
};

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    logout();
  });
}

const restPasswordForm = document.querySelector('.password_reset-form');

if (restPasswordForm) {
  restPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resetToken = document.querySelector('.password_reset_container').dataset.token;
    try {
      document.querySelector('.btn-password_rest').textContent = `Password updated...`;
      const password = document.getElementById('reset_password-new').value;
      const passwordConfirm = document.getElementById('reset_password_confirm-new').value;

      await axios.patch(
        `http://127.0.0.1:3000/api/v1/users/resetPassword/${resetToken}`,
        { password, passwordConfirm }
      );

      showAlert('Your password is updated', 'success');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } catch (err) {
      document.querySelector('.btn-password_rest').textContent = `Set password`;
      showAlert(err.response.data.message, 'error');
    }
  });
}

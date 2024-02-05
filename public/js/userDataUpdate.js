const userDataform = document.querySelector('.account-details-form');
const userPasswordForm = document.querySelector(
  '.form-account-password-change'
);

const updateUserData = async function (type, updateData) {
  try {
    const url =
      type === 'password'
        ? `http://127.0.0.1:3000/api/v1/users/updatePassword`
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios.patch(url, updateData);

    showAlert(`Your account is updated with ${type.toUpperCase()}`, 'success');
    window.setTimeout(() => {
      location.reload(true);
    }, 1500);
  } catch (err) {
    showAlert(err.response.data.message, 'error');
  }
};

if (userDataform) {
  userDataform.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', document.getElementById('account-name').value);
    form.append('email', document.getElementById('account-email').value);
    form.append('photo', document.getElementById('profile-photo').files[0]);

    updateUserData('data', form);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById(
      'account-current_password'
    ).value;
    const password = document.getElementById('account-new_password').value;
    const passwordConfirm = document.getElementById(
      'account-new_confirm_password'
    ).value;

    updateUserData('password', { oldPassword, password, passwordConfirm });

    document.getElementById('account-current_password').value = '';
    document.getElementById('account-new_password').value = '';
    document.getElementById('account-new_confirm_password').value = '';
  });
}

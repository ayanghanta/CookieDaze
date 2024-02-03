const loginForm = document.querySelector('.form-login');

// AXIOS EXPOSE GLOBALLY BY CDN SCRIPT

const clearLoginForm = () => {
  document.querySelector('#login-email').value = '';
  document.querySelector('#login-password').value = '';
};

const login = async (email, password) => {
  try {
    const res = await axios.post('http://127.0.0.1:3000/api/v1/users/login', {
      email,
      password,
    });
    closeModal();
    clearLoginForm();
    // console.log(res);
    window.setTimeout(() => {
      location.reload(true);
    }, 1500);
  } catch (err) {
    alert(`${err.response.data.message} ⚠️`);
    console.log(err.response.data.message);
  }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;
  login(email, password);

  // const
});

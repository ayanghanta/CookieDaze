'use strict';

//
const mobileNavEl = document.querySelector('.mobile-navs');
const headerEl = document.querySelector('.header');
const allNavItem = document.querySelectorAll('.nav-item');
const navItems = document.querySelector('.nav-items');
const sectionHeroEl = document.querySelector('.hero-section');
const singUpBtn = document.querySelector('.btn-nav-sing-up');
const modalEl = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const loginFormModal = document.querySelector('.form-login');
const sendRestTokenForm = document.querySelector('.modal-password-rest-form');
const modalSingInBtn = document.querySelector('.btn-modal-SignUp');
const modalLoginText = document.querySelector('.login-text');
const loginTextBtn = document.querySelector('.login-text-btn');
const modalSingUpText = document.querySelector('.singup-text');
const forgotPasswordTextBtn = document.querySelector('.forgot-password-text');
const btnSentRestToken = document.querySelector('.btn-modal-send_verification_code');

// Mobile-navigation
mobileNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

Array.from(allNavItem).forEach((item) => {
  item.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
  });
});
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Sticky navigation

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
if (sectionHeroEl) {
  obs.observe(sectionHeroEl);
}

const closeModal = function () {
  // document.getElementById("myForm").reset();
  document.querySelector('.modal-password-rest-form').reset();
  document.querySelector('.form-login').reset();
  modalEl.classList.add('hidden');
  overLay.classList.add('hidden');
};

const openLoginDisplay = function () {
  sendRestTokenForm.classList.add('hide');
  loginFormModal.classList.remove('hide');
  modalLoginText.classList.add('hide');
  modalSingUpText.classList.remove('hide');
};

const openSignUpDisplay = function () {
  sendRestTokenForm.classList.remove('hide');
  loginFormModal.classList.add('hide');
  modalLoginText.classList.remove('hide');
  modalSingUpText.classList.add('hide');
};

if (singUpBtn) {
  singUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modalEl.classList.remove('hidden');
    overLay.classList.remove('hidden');
  });
}
modalCloseBtn.addEventListener('click', function () {
  closeModal();
  openLoginDisplay();
});
overLay.addEventListener('click', function () {
  closeModal();
  openLoginDisplay();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    closeModal();
    openLoginDisplay();
  }
});

loginTextBtn.addEventListener('click', openLoginDisplay);
forgotPasswordTextBtn.addEventListener('click', openSignUpDisplay);

if (sendRestTokenForm) {
  sendRestTokenForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('verification-email').value;
    try {
      btnSentRestToken.textContent = 'Sending email...';
      await axios.post(`http://127.0.0.1:3000/api/v1/users/forgotpassword`, {
        email,
      });

      showAlert(`Token send to ${email}`, 'success');
      btnSentRestToken.textContent = ' Send verification code';
      closeModal();
    } catch (err) {
      // console.log(err, 'error');
      btnSentRestToken.textContent = ' Send verification code';

      showAlert(err.response.data.message, 'error');
    }
  });
}

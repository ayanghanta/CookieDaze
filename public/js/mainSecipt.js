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
const singupFormModal = document.querySelector('.modal-singUp-form');
const modalSingInBtn = document.querySelector('.btn-modal-SignUp');
const modalLoginText = document.querySelector('.login-text');
const loginTextBtn = document.querySelector('.login-text-btn');
const modalSingUpText = document.querySelector('.singup-text');
const singupTextBtn = document.querySelector('.singUp-text-btn');
const btnClosecart = document.querySelector('.close-cart');

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
  modalEl.classList.add('hidden');
  overLay.classList.add('hidden');
};

const openLoginDisplay = function () {
  singupFormModal.classList.add('hide');
  loginFormModal.classList.remove('hide');
  modalLoginText.classList.add('hide');
  modalSingUpText.classList.remove('hide');
};

const openSignUpDisplay = function () {
  singupFormModal.classList.remove('hide');
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
  openSignUpDisplay();
});
overLay.addEventListener('click', function () {
  closeModal();
  openSignUpDisplay();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    closeModal();
    openSignUpDisplay();
  }
});

loginTextBtn.addEventListener('click', openLoginDisplay);
singupTextBtn.addEventListener('click', openSignUpDisplay);

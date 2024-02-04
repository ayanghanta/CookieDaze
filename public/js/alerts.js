const hideAlert = () => {
  const el = document.querySelector('.alert_window');
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (message, type) => {
  // type is 'success' OR 'error'
  hideAlert();
  const markup = `<div class="alert_window alert_window--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

// EXPOSE GLOBALLY

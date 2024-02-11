// UPLOAD IMAGE PREVIEW
const photoInput = document.getElementById('inp_profile_photo');
const previewImage = document.getElementById('user_profile_pic');

function previewSelectedImage() {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
  }
}
if (photoInput) {
  photoInput.addEventListener('change', previewSelectedImage);
}
// ORTHER FUNCTIONALITY
const singupForm = document.querySelector('.singup-form');

if (singupForm) {
  singupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.create_account-btn').textContent = 'Creating account...';
    const form = new FormData();

    form.append('name', document.getElementById('user_name').value);
    form.append('email', document.getElementById('user_email').value);
    form.append('password', document.getElementById('user_password').value);
    form.append(
      'passwordConfirm',
      document.getElementById('user_password_confirm').value
    );
    if (document.getElementById('inp_profile_photo').files[0]) {
      form.append('photo', document.getElementById('inp_profile_photo').files[0]);
    }
    await singup(form);
    document.querySelector('.create_account-btn').textContent = 'Create Account';
  });
}

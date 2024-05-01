document.addEventListener('DOMContentLoaded', function () {
  const depositBtn = document.getElementById('depositbtn');
  const nickInput = document.getElementById('nickInput');
  const passwordInput = document.getElementById('passwordInput');
  const warnNick = document.getElementById('warnID');
  const warnPassword = document.getElementById('warnPassword');

  depositBtn.addEventListener('click', function (event) {
    event.preventDefault();

    if (nickInput.value.trim() === '') {
      warnNick.classList.remove('transparent');
    } else {
      warnNick.classList.add('transparent');
    }

    if (passwordInput.value.trim() === '') {
      warnPassword.classList.remove('transparent');
    } else {
      warnPassword.classList.add('transparent');
    }
  });
});
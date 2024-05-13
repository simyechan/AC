document.addEventListener('DOMContentLoaded', function () {
  const depositBtn = document.getElementById('depositbtn');
  const depoInput = document.getElementById('depoInput');
  const explInput = document.getElementById('explInput');
  const warnDepo = document.getElementById('warnDepo');
  const warnExpl = document.getElementById('warnExpl');

  depositBtn.addEventListener('click', function (event) {
    event.preventDefault();

    if (depoInput.value.trim() === '') {
      warnDepo.classList.remove('transparent');
    } else {
      warnDepo.classList.add('transparent');
    }

    if (explInput.value.trim() === '') {
      warnExpl.classList.remove('transparent');
    } else {
      warnExpl.classList.add('transparent');
    }

    if (depoInput.value.trim() !== '' && explInput.value.trim() !== '') {
      const amount = parseFloat(depoInput.value);
      const explanation = explInput.value;

      axios.post('/deposit', {
        amount: amount,
        explanation: explanation
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error('Error: ', error);
      });
    }
  });
});
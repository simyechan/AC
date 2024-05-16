document.addEventListener('DOMContentLoaded', function () {
  const depositBtn = document.getElementById('depositbtn');
  const depoInput = document.getElementById('depoInput');
  const explInput = document.getElementById('explInput');
  const categoryInput = document.getElementById('categoryInput');
  const warnDepo = document.getElementById('warnDepo');
  const warnExpl = document.getElementById('warnExpl');
  const warnCategory = document.getElementById('warnCategory');

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

    if (categoryInput.value.toLowerCase() === '') {
      warnCategory.classList.remove('transparent');
    } else {
      warnCategory.classList.add('transparent');
    }

    const amount = parseFloat(depoInput.value.trim());
    const explanation = explInput.value.trim();
    const category = categoryInput.value.trim();

    if (!isNaN(amount) && amount >= 0) {
      axios.post('/deposit', {
        amount: amount,
        explanation: explanation,
        category: category
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error('Error: ', error);
      });
    } else {
      console.error('Invalid amount: ', depoInput.value);
    }
  });

  async function fetchCategories() {
    try {
      const response = await axios.get('/categorys');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function searchCategories() {
    const input = categoryInput.value.toLowerCase();
    const categoryList = document.getElementById('categoryList');
    const categories = await fetchCategories();

    const filterCategory = categories.filter(category => category.toLowerCase().includes(input));

    categoryList.innerHTML = '';

    filterCategory.forEach(category => {
      const list = document.createElement('li');
      list.textContent = category;
      list.onclick = () => {
        categoryInput.value = category;
        categoryList.innerHTML = '';
      };
      categoryList.appendChild(list);
    });
  }

  categoryInput.addEventListener('input', searchCategories);

});
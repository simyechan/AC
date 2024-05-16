document.addEventListener('DOMContentLoaded', function () {
  const withdrawbtn = document.getElementById('withdrawbtn');
  const withInput = document.getElementById('withInput');
  const explInput = document.getElementById('explInput');
  const categoryInput = document.getElementById('categoryInput');
  const warnWith = document.getElementById('warnWith');
  const warnExpl = document.getElementById('warnExpl');
  const warnCategory = document.getElementById('warnCategory');

  withdrawbtn.addEventListener('click', function (event) {
    event.preventDefault();

    if (withInput.value.trim() === '') {
      warnWith.classList.remove('transparent');
    } else {
      warnWith.classList.add('transparent');
    }

    if (explInput.value.trim() === '') {
      warnExpl.classList.remove('transparent');
    } else {
      warnExpl.classList.add('transparent');
    }

    if (categoryInput.value.trim() === '') {
      warnCategory.classList.remove('transparent');
    } else {
      warnCategory.classList.add('transparent')
    }
    
    const amount = parseFloat(withInput.value.trim());
    const explanation = explInput.value.trim();
    const category = categoryInput.value.trim();

    if (isNaN(amount) && amount <= 0) {
      axios.post('/withdraw', {
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
      console.error('Invalid amount: ', withInput.value);
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
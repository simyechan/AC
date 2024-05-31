document.addEventListener("DOMContentLoaded", function () {
  const depositBtn = document.getElementById("depositbtn");
  const depoInput = document.getElementById("depoInput");
  const explInput = document.getElementById("explInput");
  const categoryInput = document.getElementById("categoryInput");
  const dateInput = document.getElementById("dateInput");
  const warnDepo = document.getElementById("warnDepo");
  const warnExpl = document.getElementById("warnExpl");
  const warnCategory = document.getElementById("warnCategory");
  const warnDate = document.getElementById("warnDate");

  depositBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (depoInput.value.trim() === "") {
      warnDepo.classList.remove("transparent");
    } else {
      warnDepo.classList.add("transparent");
    }

    if (explInput.value.trim() === "") {
      warnExpl.classList.remove("transparent");
    } else {
      warnExpl.classList.add("transparent");
    }

    if (dateInput.value.trim() === "") {
      warnDate.classList.remove("transparent");
    } else {
      warnDate.classList.add("transparent");
    }

    const amount = parseFloat(depoInput.value.trim());
    const explanation = explInput.value.trim();
    const date = dateInput.value.trim();
    const category = categoryInput.value.trim();

    if (!isNaN(amount) && amount >= 0) {
      const selectedCategory = category.trim() !== "" ? category : "기타";
      const token = localStorage.getItem("accessTkn");
      console.log(date);
      axios
        .post(
          "http://localhost:8000/income/deposit",
          {
            amount: amount,
            explanation: explanation,
            date: date,
            category: selectedCategory,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          alert("입금이 저장되었습니다.");
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });
    } else {
      console.error("Invalid amount: ", depoInput.value);
    }
  });

  async function searchCategories() {
    const input = categoryInput.value.toLowerCase();
    const categoryList = document.getElementById("categoryList");

    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8000/common/categorys"
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    try {
      const categories = await fetchCategories();
      const filterCategory = categories.filter((category) =>
        category.toLowerCase().includes(input)
      );

      categoryList.innerHTML = "";

      filterCategory.forEach((category) => {
        const list = document.createElement("li");
        list.textContent = category;
        list.addEventListener("click", () => {
          categoryList.innerHTML = "";
          categoryInput.value = category;
        });
        categoryList.appendChild(list);
      });
    } catch (error) {
      console.error("Error searching categories:", error);
    }
  }

  searchCategories();
  categoryInput.addEventListener("input", searchCategories);
});

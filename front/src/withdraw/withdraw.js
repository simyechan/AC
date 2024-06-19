document.addEventListener("DOMContentLoaded", function () {
  const withdrawbtn = document.getElementById("withdrawbtn");
  const withInput = document.getElementById("withInput");
  const explInput = document.getElementById("explInput");
  const categoryInput = document.getElementById("categoryInput");
  const dateInput = document.getElementById("dateInput");
  const warnWith = document.getElementById("warnWith");
  const warnExpl = document.getElementById("warnExpl");
  const warnCategory = document.getElementById("warnCategory");
  const warnDate = document.getElementById("warnDate");

  withdrawbtn.addEventListener("click", function (event) {
    event.preventDefault();

    let valid = true;

    if (withInput.value.trim() === "") {
      warnWith.classList.remove("transparent");
      valid = false;
    } else {
      warnWith.classList.add("transparent");
    }

    if (explInput.value.trim() === "") {
      warnExpl.classList.remove("transparent");
      valid = false;
    } else {
      warnExpl.classList.add("transparent");
    }

    if (dateInput.value.trim() === "") {
      warnDate.classList.remove("transparent");
      valid = false;
    } else {
      warnDate.classList.add("transparent");
    }

    const amount = parseFloat(withInput.value.trim());
    const explanation = explInput.value.trim();
    const date = dateInput.value.trim();
    const category = categoryInput.value.trim();

    if (isNaN(amount) || amount >= 0) {
      warnWith.classList.remove("transparent");
      if (amount >= 0) {
        alert("음수로 입력해주세요");
      }
      valid = false;
    } else {
      warnWith.classList.add("transparent");
    }

    if (!valid) {
      console.error("Invalid input values");
      return;
    }

    const selectedCategory = category !== "" ? category : "기타";
    const token = localStorage.getItem("accessTkn");

    axios
      .post(
        "http://localhost:8000/expense/withdraw",
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
        alert("출금이 저장되었습니다.");
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
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

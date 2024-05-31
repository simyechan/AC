document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDate = urlParams.get("date");
  const isoDate = new Date(selectedDate).toISOString().split("T")[0];
  if (!isoDate) {
    alert("날짜 정보가 없습니다.");
    return;
  }

  // 데이터 가져오기 호출
  fetchDaliyData(isoDate);

  async function fetchDaliyData(date) {
    let total = 0;
    try {
      const token = localStorage.getItem("accessTkn");
      const response = await axios.get(
        `http://localhost:8000/income/deposit/${date}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const incomeList = response.data;

      const incomeAdd = document.getElementById("incomeList");
      incomeList.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.category}: ${item.amount}원`;
        total += item.total;
        incomeAdd.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error: ", error);
    }

    try {
      const token = localStorage.getItem("accessTkn");
      const response = await axios.get(
        `http://localhost:8000/expense/withdraw/${date}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const expenseList = response.data;

      const expenseAdd = document.getElementById("expenseList");
      expenseList.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.category}: ${item.amount}원`;
        total += item.total;
        expenseAdd.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error: ", error);
    }

    const totalAmount = document.getElementById("totalAmount");
    totalAmount.textContent = `총 금액: ${total}원`;
  }
});

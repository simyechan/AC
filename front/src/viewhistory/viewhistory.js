document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDate = urlParams.get("date");
  if (!selectedDate) {
    alert("날짜 정보가 없습니다.");
    return;
  }

  const isoDate = new Date(selectedDate).toISOString().split("T")[0];

  fetchDailyData(isoDate);

  async function fetchDailyData(date) {
    const token = localStorage.getItem("accessTkn");
    let incomeTotal = 0;
    let expenseTotal = 0;

    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        axios.get(`http://localhost:8000/income/deposit/${date}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`http://localhost:8000/expense/withdraw/${date}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const incomeList = incomeResponse.data;
      const expenseList = expenseResponse.data;

      const incomeAdd = document.getElementById("incomeList");
      incomeList.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.category}: ${item.amount}원 (${item.explanation})`;
        incomeTotal += item.amount;
        incomeAdd.appendChild(listItem);
      });

      const expenseAdd = document.getElementById("expenseList");
      expenseList.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.category}: ${item.amount}원 (${item.explanation})`;
        expenseTotal += item.amount;
        expenseAdd.appendChild(listItem);
      });

      const totalAmount = document.getElementById("totalAmount");
      totalAmount.textContent = `총 금액: ${incomeTotal + expenseTotal}원`;
    } catch (error) {
      console.error("오류: ", error);
      alert("데이터를 가져오는 중 오류가 발생했습니다.");
    }
  }
});

document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDate = urlParams.get('date');
  if (selectedDate) {
      try {
          const response = await fetch('/day?date=' + selectedDate);
          const data = await response.json();
          if (response.ok) {
              const incomes = data.incomes || [];
              const expenses = data.expenses || [];

              const incomeListElement = document.getElementById('incomeList');
              const expenseListElement = document.getElementById('expenseList');

              incomes.forEach(income => {
                const incomeItem = document.createElement('li');
                incomeItem.textContent = 'Amount: ${income.amount}, Date: ${new Date(income.date).toLocaleString()}';
                incomeListElement.appendChild(incomeItem);
              });

              expenses.forEach(expense => {
                const expenseItem = document.createElement('li');
                expenseItem.textContent = 'Amount: ${expense.amount}, Date: ${new Date(expense.date).toLocaleString()}';
                expenseListElement.appendChild(expenseItem);
              });

            const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
            const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
            const totalElement = document.getElementById('totalAmount');
            totalElement.textContent = `총 금액: ${totalIncome - totalExpense}원`;
          } else {
              console.error('API 요청 실패:', data.error);
          }
      } catch (error) {
          console.error('API 요청 중 오류:', error);
      }
  } else {
      console.error('날짜 정보가 없습니다.');
  }
});
document.addEventListener('DOMContentLoaded', function() {
    const loginbtn = document.querySelector(".loginbtn");
    const mypagebtn = document.querySelector(".mypagebtn");

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function(info) {
            document.getElementById('selectedDate').value = info.dateStr;
            document.getElementById('expenseForm').style.display = 'block';
        }
    });
    calendar.render();

    fetch('http://localhost:8000/income/goal')
        .then(response => response.json())
        .then(goalData => {
            document.getElementById('monthlyGoalAmount').textContent = goalData.amount;
        })
        .catch(error => {
            console.error('입금 목표 금액을 가져오는 중 오류가 발생했습니다. :', error);
        });

    fetch('http://localhost:8000/expense/target')
        .then(response => response.json())
        .then(targetData => {
            document.getElementById('monthlyTargetAmount').textContent = targetData.amount;
        })
        .catch(error => {
            console.error('지출 목표 금액을 가져오는 중 오류가 발생했습니다. :', error);
        });

        // 이번달 총 금액 추가!!!
    // fetch('http://localhost:8000/common/month')
    
    redirectNotLogin();
});

function redirectNotLogin() {
    const accessToken = localStorage.getItem('accessTkn');

    // 로그인이 되어 있지 않다면 notlogin.html로 리디렉션
    if (!accessToken) {
        window.location.href = '../notlogin/notlogin.html';
    }
}
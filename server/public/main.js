document.addEventListener('DOMContentLoaded', function() {
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

    function saveExpense() {
        var date = document.getElementById('selectedDate').value;
        var amount = document.getElementById('expenseAmount').value;
        var description = document.getElementById('expenseDescription').value;

        alert('날짜: ' + date + ', 금액: ' + amount + ', 설명: ' + description + '가 저장되었습니다.');

        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseForm').style.display = 'none';
    }

    // 저장 버튼에 클릭 이벤트를 추가합니다.
    document.getElementById('saveButton').addEventListener('click', saveExpense);
});

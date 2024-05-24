// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: 'dayGridMonth',
//       dayCellContent: function(info) {
//         // 날짜 가져오기
//         const date = info.dateStr;
        
//         // 날짜별 총 금액 가져오기
//         fetch('/getTotalForDate?date=' + date)
//           .then(response => response.json())
//           .then(data => {
//             const totalAmount = data.total || 0;
//             // 총 금액을 날짜 셀에 추가하는 HTML 생성
//             const totalHtml = `<div>${info.dayNumber}<br>${totalAmount}원</div>`;
//             // 날짜 셀에 총 금액 표시
//             info.dayEl.innerHTML += totalHtml;
//           })
//           .catch(error => {
//             console.error('총 금액을 가져오는 중 오류가 발생했습니다.', error);
//           });
//       },
//       events: '/getAmount'
//     });
//     calendar.render();
//   });

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
        },
        events: '/getAmount'
    });
    calendar.render();

    fetch('/categorys')
        .then(response => response.json())
        .then(categories => {
            const selectCategory = this.documentElement('expenseCategory');

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                selectCategory.appendChild(option);    
            });
        })
        .catch(error => {
            console.error('카테고리를 가져오는 중 오류가 발생했습니다.', error);
        });
});

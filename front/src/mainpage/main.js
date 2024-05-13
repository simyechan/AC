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

    function saveExpense() {
        var date = document.getElementById('selectedDate').value;
        var amount = document.getElementById('expenseAmount').value;
        var category = document.getElementById('expenseCategory').value;
        var description = document.getElementById('expenseDescription').value;
        
        alert('날짜: ' + date + ', 금액: ' + amount + ', 설명: ' + description + ', 카테고리 ID: ' + category + '가 저장되었습니다.');
        calendar.refetchEvents();
        
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseCategory').value = '';
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseForm').style.display = 'none';
    }
    
    // 저장 버튼에 클릭 이벤트를 추가합니다.
    document.getElementById('saveButton').addEventListener('click', saveExpense);

});


// axios.defaults.baseURL = 'http://192.168.52.156:8080';
// let token = localStorage.getItem('accessTkn') || '';
// localStorage.removeItem("PageId");

// axios.get('/memoir/list')
//   .then(function(result){
//       console.log('통신 결과 : ', result);

//       if(token !== ''){
//           loginbtn.innerText = "글쓰기";
//           loginbtn.addEventListener("click", registrationgo);
//       }else{
//           loginbtn.addEventListener("click", logingo);
//           mypagebtn.style.display = 'none';
//       }
      
//   })
//   .catch(function(error){
//       console.error('error 발생 : ', error);
//   });

//   function logingo(){
//       location.href = '../login/login.html';
//   }
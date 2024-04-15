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
    
    function saveExpense() {
        var date = document.getElementById('selectedDate').value;
        var amount = document.getElementById('expenseAmount').value;
        var description = document.getElementById('expenseDescription').value;
        
        alert('날짜: ' + date + ', 금액: ' + amount + ', 설명: ' + description + '가 저장되었습니다.');
        calendar.refetchEvents();
        
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseForm').style.display = 'none';
    }
    
    // 저장 버튼에 클릭 이벤트를 추가합니다.
    document.getElementById('saveButton').addEventListener('click', saveExpense);
})
.catch(function(error) {
    console.error('error 발생 : ', error);
});

function logingo() {
    location.href = '../login/login.html';
};

function registrationgo() {
    // registrationgo 함수의 구현 내용은 여기에 추가하세요
};


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
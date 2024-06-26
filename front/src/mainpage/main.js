let selectedDate = null;
let goalDate = null;

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    dateClick: function (info) {
      document.getElementById("selectedDate").value = info.dateStr;
      document.getElementById("expenseForm").style.display = "block";
      selectedDate = info.date;
    },
    datesSet: function (info) {
      var currentDate = calendar.getDate();
      var currentMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      goalDate = currentMonthStart;
      fetchUserName();
      fetchMonthlyTotal(currentMonthStart);
      fetchMonthlyGoal(currentMonthStart);
      fetchMonthlyTarget(currentMonthStart);
    },
  });
  calendar.render();

  redirectNotLogin();
});

function redirectNotLogin() {
  const accessToken = localStorage.getItem("accessTkn");

  // 로그인이 되어 있지 않다면 notlogin.html로 리디렉션
  if (!accessToken) {
    window.location.href = "../notlogin/notlogin.html";
  }
}

async function fetchUserName() {
  const token = localStorage.getItem("accessTkn");
  try {
    const response = await axios.get(`http://localhost:8000/common/nick`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const name = response.data.nick;
    document.getElementById("username").textContent =
      "닉네임 : " + name.toLocaleString();
  } catch (error) {
    console.error("사용자의 이름을 가져오는 중 오류가 발생했습니다. : ", error);
  }
}

async function fetchMonthlyGoal(date) {
  console.log(date);
  const token = localStorage.getItem("accessTkn");
  try {
    const response = await axios.get(
      `http://localhost:8000/income/goal/${date}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const goal = response.data.goalAmount;
    document.getElementById("monthlyGoalAmount").textContent =
      goal.toLocaleString();
  } catch (error) {
    console.error(
      "입금 목표 금액을 가져오는 중 오류가 발생했습니다. : ",
      error
    );
  }
}

async function fetchMonthlyTarget(date) {
  const token = localStorage.getItem("accessTkn");
  try {
    const response = await axios.get(
      `http://localhost:8000/expense/target/${date}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const target = response.data.targetAmount;
    document.getElementById("monthlyTargetAmount").textContent =
      target.toLocaleString();
  } catch (error) {
    console.error("지출 목표 금액을 가져오는 중 오류가 발생했습니다. :", error);
  }
}

async function fetchMonthlyTotal(date) {
  const token = localStorage.getItem("accessTkn");
  try {
    const response = await axios.get(
      `http://localhost:8000/common/month/${date}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const totalAmount = response.data.total;
    document.getElementById("monthlyTotalAmount").textContent =
      totalAmount.toLocaleString();
  } catch (error) {
    console.error("한 달 총 금액을 가져오는 중 오류가 발생했습니다. : ", error);
  }
}

document
  .querySelector(".viewhistorybtn")
  .addEventListener("click", function () {
    if (selectedDate) {
      location.href = `../viewhistory/viewhistory.html?date=${selectedDate}`;
    } else {
      alert("날짜를 선택해주세요.");
    }
  });

document.querySelector(".goalbtn").addEventListener("click", function () {
  if (goalDate) {
    location.href = `../goal/goal.html?date=${goalDate}`;
  } else {
    alert("입금 목표 금액 작성 버튼은 눌러주세요");
  }
});

document.querySelector(".targetbtn").addEventListener("click", function () {
  if (goalDate) {
    location.href = `../target/target.html?date=${goalDate}`;
  } else {
    alert("지출 목표 금액 작성 버튼은 눌러주세요");
  }
});

export function getSelectedDate() {
  return selectedDate;
}

document.addEventListener("DOMContentLoaded", function () {
  const goalBtn = document.getElementById("goalButton");
  const goalInput = document.getElementById("goalamountInput");
  const warnGoal = document.getElementById("warnGoal");
  const urlParams = new URLSearchParams(window.location.search);
  const goalDate = urlParams.get("date");
  const isoDate = new Date(goalDate).toISOString().split("T")[0];

  if (!isoDate) {
    alert("날짜 정보가 없습니다.");
    return;
  }

  goalBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (goalInput.value.trim() === "") {
      warnGoal.classList.remove("transparent");
    } else {
      warnGoal.classList.add("transparent");
    }

    const goal = parseFloat(goalInput.value.trim());

    if (!isNaN(goal)) {
      const token = localStorage.getItem("accessTkn");
      axios
        .post(
          `http://localhost:8000/income/goal/${isoDate}`,
          {
            goal: goal,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          alert("입금 목표 금액이 저장 되었습니다.");
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });
    } else {
      console.error("Invalid amount: ", goalInput.value);
    }
  });
});

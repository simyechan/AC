document.addEventListener("DOMContentLoaded", function () {
  const targetBtn = document.getElementById("targetButton");
  const targetInput = document.getElementById("targetamountInput");
  const warnTarget = document.getElementById("warnTarget");
  const urlParams = new URLSearchParams(window.location.search);
  const goalDate = urlParams.get("date");
  const isoDate = new Date(goalDate).toISOString().split("T")[0];

  if (!isoDate) {
    alert("날짜 정보가 없습니다.");
    return;
  }

  targetBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (targetInput.value.trim() === "") {
      warnTarget.classList.remove("transparent");
    } else {
      warnTarget.classList.add("transparent");
    }

    const target = parseFloat(targetInput.value.trim());

    if (!isNaN(target)) {
      const token = localStorage.getItem("accessTkn");
      console.log(isoDate);
      axios
        .post(
          `http://localhost:8000/expense/target/${isoDate}`,
          {
            target: target,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          alert("지출 목표 금액이 저장 되었습니다.");
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });
    } else {
      console.error("Invalid amount: ", target.value);
    }
  });
});

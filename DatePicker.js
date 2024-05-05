"use strict";
function createDatePicker(id, callback, initialDate) {
  const currentDate =
    initialDate !== undefined && initialDate !== null
      ? initialDate
      : new Date();

  function render(date) {
    const container = document.getElementById(id);
    if (!container) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }

    const selectedDate = new Date(date);

    selectedDate.setDate(1);

    let calendarHTML = `
      <div class="header">
        <span class="prev-month">&lt;</span>
        <span class="current-month">${selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
        <span class="next-month">&gt;</span>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="day-header">Su</th>
            <th class="day-header">Mo</th>
            <th class="day-header">Tu</th>
            <th class="day-header">We</th>
            <th class="day-header">Th</th>
            <th class="day-header">Fr</th>
            <th class="day-header">Sa</th>
          </tr>
        </thead>
        <tbody>
    `;

    const firstDayOfWeek = selectedDate.getDay();

    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const firstDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    firstDate.setDate(1 - daysFromPrevMonth);

    for (let week = 0; week < 6; week++) {
      calendarHTML += "<tr>";
      for (let day = 0; day < 7; day++) {
        const currentDay = new Date(firstDate);
        currentDay.setDate(currentDay.getDate() + week * 7 + day);
        const isCurrentMonth =
          currentDay.getMonth() === selectedDate.getMonth();

        if (!isCurrentMonth) {
          calendarHTML += `<td class="disabled">${currentDay.getDate()}</td>`;
        } else {
          const dateObject = {
            month: currentDay.getMonth() + 1,
            day: currentDay.getDate(),
            year: currentDay.getFullYear(),
          };
          calendarHTML += `<td class="clickable" onclick="selectDate(${JSON.stringify(dateObject)})">${currentDay.getDate()}</td>`;
        }
      }
      calendarHTML += "</tr>";
    }

    calendarHTML += `
        </tbody>
      </table>
    `;

    container.innerHTML = calendarHTML;

    const prevMonthSpan = container.querySelector(".prev-month");
    const nextMonthSpan = container.querySelector(".next-month");
    prevMonthSpan.addEventListener("click", () => prevMonth());
    nextMonthSpan.addEventListener("click", () => nextMonth());
  }

  function selectDate(dateObject) {
    callback(id, dateObject);
  }

  function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    render(currentDate);
  }

  function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    render(currentDate);
  }

  render(currentDate);

  window.selectDate = selectDate;
  window.prevMonth = prevMonth;
  window.nextMonth = nextMonth;

  return {
    prevMonth,
    nextMonth,
    selectDate,
  };
}

var datePicker1 = createDatePicker("datepicker1", function (id, fixedDate) {
  console.log(
    "DatePicker with id",
    id,
    "selected date:",
    fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year,
  );
});

var datePicker2 = createDatePicker(
  "datepicker2",
  function (id, fixedDate) {
    console.log(
      "DatePicker with id",
      id,
      "selected date:",
      fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year,
    );
  },
  new Date("January 1, 2009"),
);

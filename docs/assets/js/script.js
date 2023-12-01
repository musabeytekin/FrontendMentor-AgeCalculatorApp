const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  dayTag = document.getElementById("day");
  monthTag = document.getElementById("month");
  yearTag = document.getElementById("year");

  const day = parseInt(dayTag.value.trim());
  const month = parseInt(monthTag.value.trim());
  const year = parseInt(yearTag.value.trim());

  const yearResult = document.querySelector(
    "#year-result .result__item--number"
  );
  const monthResult = document.querySelector(
    "#month-result .result__item--number"
  );
  const dayResult = document.querySelector("#day-result .result__item--number");

  const currentDate = new Date();

  let success = true;

  if (isNaN(day)) {
    setError(dayTag, "This field is required");
    success = false;
  } else if (day < 1 || day > new Date(year, month, 0).getDate()) {
    setError(dayTag, "Must be a valid day");
    success = false;
  } else {
    removeError(dayTag);
  }

  if (isNaN(month)) {
    setError(monthTag, "This field is required");
    success = false;
  } else if (month < 1 || month > 12) {
    setError(monthTag, "Must be a valid month");
    success = false;
  } else {
    removeError(monthTag);
  }

  if (isNaN(year)) {
    setError(yearTag, "This field is required");
    success = false;
  } else if (year < 1900) {
    setError(yearTag, "Must be a valid year");
    success = false;
  } else if (year > currentDate.getFullYear()) {
    yearTag.parentElement.classList.add("date-input__error");
    yearTag.nextElementSibling.innerHTML = "Must be in the past";
    success = false;
  } else {
    removeError(yearTag);
  }

  if (success) {
    resetInputs();

    const date = new Date(year, month - 1, day);
    const difference = dateDifference(date, currentDate);

    let years = 0,
      months = 0,
      days = 0;
    const yearCounter = () => {
      if (years == difference.years) {
        clearInterval(yearInterval);
      } else {
        years++;
      }
      yearResult.innerHTML = years;
    };

    const monthCounter = () => {
      if (months == difference.months) {
        clearInterval(monthInterval);
      } else {
        months++;
      }
      monthResult.innerHTML = months;
    };

    const dayCounter = () => {
      if (days == difference.days) {
        clearInterval(dayInterval);
      } else {
        days++;
      }
      dayResult.innerHTML = days;
    };

    let yearInterval = setInterval(yearCounter, 75);
    let monthInterval = setInterval(monthCounter, 75);
    let dayInterval = setInterval(dayCounter, 75);
  }
});

const setError = (tag, message) => {
  tag.parentElement.classList.add("date-input__error");
  tag.nextElementSibling.innerHTML = message;
};

const removeError = (tag) => {
  tag.parentElement.classList.remove("date-input__error");
  tag.nextElementSibling.innerHTML = "";
};

const resetInputs = () => {
  dayTag = document.getElementById("day");
  monthTag = document.getElementById("month");
  yearTag = document.getElementById("year");

  removeError(dayTag);
  removeError(monthTag);
  removeError(yearTag);
};

function dateDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const millisecondsDifference = end - start;

  const millisecondsInSecond = 1000;
  const secondsInMinute = 60;
  const minutesInHour = 60;
  const hoursInDay = 24;
  const daysInYear = 365.25;

  const daysInMonth = 30.44;

  const millisecondsInYear =
    millisecondsInSecond *
    secondsInMinute *
    minutesInHour *
    hoursInDay *
    daysInYear;
  const yearsDifference = Math.floor(
    millisecondsDifference / millisecondsInYear
  );
  let remainingMilliseconds = millisecondsDifference % millisecondsInYear;

  const millisecondsInMonth =
    millisecondsInSecond *
    secondsInMinute *
    minutesInHour *
    hoursInDay *
    daysInMonth;
  const monthsDifference = Math.floor(
    remainingMilliseconds / millisecondsInMonth
  );
  remainingMilliseconds = remainingMilliseconds % millisecondsInMonth;

  const millisecondsInDay =
    millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay;
  const daysDifference = Math.floor(remainingMilliseconds / millisecondsInDay);

  return {
    years: yearsDifference,
    months: monthsDifference,
    days: daysDifference
  };
}

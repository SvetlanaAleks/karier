const Timer = (function () {
  "use strict";
  const daysTo = $(".days");
  const hoursTo = $(".hours");
  const minutesTo = $(".minutes");
  const secondsTo = $(".seconds");

  return {
    timerMeetup: function () {
      function timer() {
        const today = new Date();

        const countDownDate = new Date(today);
        countDownDate.setDate(countDownDate.getDate() + 1);
        countDownDate.setHours(0, 0, 0, 0);

        const distance = countDownDate - today;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        seconds = seconds < 10 ? "0" + seconds : "" + seconds;
        minutes = minutes < 10 ? "0" + minutes : "" + minutes;
        hours = hours < 10 ? "0" + hours : "" + hours;
        days = days < 10 ? "0" + days : "" + days;

        days = ("" + days).split("");
        hours = ("" + hours).split("");
        minutes = ("" + minutes).split("");
        seconds = ("" + seconds).split("");

        Timer.timeToHtml(daysTo, days);
        Timer.timeToHtml(hoursTo, hours);
        Timer.timeToHtml(minutesTo, minutes);
        Timer.timeToHtml(secondsTo, seconds);
      }
      setInterval(timer, 1000);
    },
    timeToHtml: function (container, time) {
      for (let i = 0; i < container.length; i++) {
        const element = container[i];
        element.innerHTML = time[i % 2];
      }
    },
    init: function () {
      Timer.timerMeetup();
    },
  };
})();

export default Timer;

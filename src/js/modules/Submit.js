var Submit = (function () {
  var form = $(".js-registration-form");
  return {
    submitHandler: function submitHandler() {
      form.submit(function (e) {
        e.preventDefault();

        //date, time
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var timeH = date.getHours();
        var timeM = date.getMinutes();

        form
          .find($(".js-input-date"))
          .val(`${day}.${month}.${year} / ${timeH}:${timeM}`);

        // $(".js-loader").addClass("progress");
        $.ajax({
          url: "https://api.apispreadsheets.com/data/QduW22vQumEfA2h6/",
          type: "POST",
          contentType: false,
          processData: false,
          data: new FormData(this),
          success: function success() {
            // $(".js-loader").removeClass("progress");
          },
          error: function () {
            alert("error");
          },
        });
      });
    },
    init: function init() {
      Submit.submitHandler();
    },
  };
})();

export default Submit;

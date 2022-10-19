const Controls = (function () {
  "use strict";
  const btnReasons = $(".js-btn-reasons");
  const contentReasons = $(".js-info-reasons");
  const itemsReasons = $(".js-item-reasons");
  //--//
  const btnAccordeon = $(".js-btn-accordeon");
  const contentAccordeon = $(".js-info-accordeon");
  //--//
  const inputForm = $(".js-input");
  const label = inputForm.siblings(".js-label");
  return {
    labelFormActive: function () {
      inputForm.keyup(function () {
        const _this = $(this);
        if (_this.val()) {
          _this.addClass("active");
        } else {
          _this.removeClass("active");
        }
      });
    },
    openReasonsContent: function () {
      btnReasons.on("click", function (e) {
        e.preventDefault();
        const _this = $(this);

        const parent = _this.parents(".js-item-reasons");

        itemsReasons.removeClass("active");
        contentReasons.slideUp(500);

        parent.toggleClass("active");
        parent.find(contentReasons).slideToggle();
      });
    },
    openFaqContent: function () {
      btnAccordeon.on("click", function (e) {
        e.preventDefault();
        const _this = $(this);

        const parent = _this.parents(".js-accordeon");
        if (!_this.hasClass("active")) {
          parent.find(contentAccordeon).slideUp(700);
          parent.find(btnAccordeon).removeClass("active");
        }
        _this.toggleClass("active");
        _this.next(contentAccordeon).slideToggle();
      });
    },
    init: function () {
      Controls.openReasonsContent();
      Controls.openFaqContent();
      Controls.labelFormActive();
    },
  };
})();

export default Controls;

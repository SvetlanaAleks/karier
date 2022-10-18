import noScroll from "../global/noScroll";
const Menu = (function () {
  "use strict";
  const burgerMenu = $(".js-burger");
  const linkToTarget = $(".js-scroll");
  const overlay = $(".js-overlay");
  const language = $(".js-language");
  function scroll(target) {
    const top = target.offset().top;
    $("html, body").animate(
      {
        scrollTop: top - 15,
      },
      800
    );
  }
  return {
    showActiveLocale: function () {
      const activeLang = $(`.js-language[data-lang=${locale}]`);
      language.removeClass("active");
      activeLang.addClass("active");
    },
    showMobileMenu: function () {
      burgerMenu.click(function (e) {
        e.preventDefault();
        const target = $($(this).data("target"));
        target.toggleClass("menu-mobile--active");
        burgerMenu.toggleClass("burger--active");
        overlay.toggleClass("active");
        noScroll.toggle();
      });
    },
    scrollToTarget: function () {
      linkToTarget.click(function (e) {
        e.preventDefault();
        noScroll.off();
        const _this = $(this);
        const href = _this.attr("href");
        const target = $(href);

        if (_this.data("target")) {
          const target = $(_this.data("target"));
          scroll(target);
        }
        if (target.length) {
          scroll(target);
        }

        $(".menu-mobile").removeClass("menu-mobile--active");
        burgerMenu.removeClass("burger--active");
        overlay.removeClass("active");
      });
    },
    init: function () {
      Menu.showMobileMenu();
      Menu.scrollToTarget();
      Menu.showActiveLocale();
    },
  };
})();

export default Menu;

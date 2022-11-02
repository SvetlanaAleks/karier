import "slick-carousel";
const Sliders = (function () {
  "use strict";
  const tutorsSliders = $(".js-tutors-slider");
  const storiesSliders = $(".js-stories-slider");

  return {
    tutorsSliders: function () {
      tutorsSliders.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        prevArrow:
          '<button class="prev"><i class="fico fico-arrowSlider"></i></button>',
        nextArrow:
          '<button class="next"><i class="fico fico-arrowSlider"></i></button>',
        dotsClass: "slick-dots",
        variableWidth: true,
        infinite: false,
        responsive: [
          {
            breakpoint: 1141,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              variableWidth: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
            },
          },
        ],
      });
    },
    storiesSliders: function () {
      storiesSliders.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow:
          '<button class="prev"><i class="fico fico-arrowSlider"></i></button>',
        nextArrow:
          '<button class="next"><i class="fico fico-arrowSlider"></i></button>',
        infinite: false,
        fade: true,
        cssEase: "linear",
      });
    },
    init: function () {
      Sliders.tutorsSliders();
      Sliders.storiesSliders();
    },
  };
})();

export default Sliders;

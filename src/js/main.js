// Main JS module
// objectFitImages polyfill
import objectFitImages from "object-fit-images";
import Controls from "./modules/Controls";
import Sliders from "./modules/Sliders";
import Menu from "./modules/Menu";
import Timer from "./modules/Timer";
import Submit from "./modules/Submit";
import Forms from "./modules/Forms";

function youtubeShowVideo() {
  var i, c, y, v, n;
  v = document.getElementsByClassName("youtube");
  for (n = 0; n < v.length; n++) {
    y = v[n];
    i = document.createElement("img");
    i.setAttribute("src", "img/preview_video.jpg");
    i.setAttribute("alt", "video-preview");
    i.setAttribute("class", "thumb");
    c = document.createElement("div");
    c.setAttribute("class", "play");
    y.appendChild(i);
    y.appendChild(c);
    y.onclick = function () {
      $(".preview__title").hide();
      var a = document.createElement("iframe");
      a.setAttribute(
        "src",
        "https://www.youtube.com/embed/" +
          this.dataset.id +
          "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1"
      );
      a.style.width = this.style.width;
      a.style.height = this.style.height;
      this.parentNode.replaceChild(a, this);
    };
  }
}

$(function () {
  objectFitImages();
  Menu.init();
  Controls.init();
  Sliders.init();
  Timer.init();
  // Submit.init();
  youtubeShowVideo();
  // Forms.init();
});

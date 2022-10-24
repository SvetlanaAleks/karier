// Main JS module
// objectFitImages polyfill
import objectFitImages from "object-fit-images";
import Controls from "./modules/Controls";
import Sliders from "./modules/Sliders";
import Menu from "./modules/Menu";
import Timer from "./modules/Timer";
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

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "20E9v5MXrRQ",
    playerVars: {
      controls: 1,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      autohide: 0,
      loop: 1,
      playlist: "20E9v5MXrRQ",
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  document.getElementsByClassName(
    "ytp-pause-overlay ytp-scroll-min"
  )[0].style.display = "none";
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  player.mute();
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  $(".js-youtube-button").click(function (e) {
    e.preventDefault();
    const _this = $(this);
    const parent = _this.parents(".js-youtube");

    if (player.isMuted()) {
      player.unMute();
      player.playVideo();
      _this.hide();
      $("#player").css({
        "z-index": "0",
      });
      parent.find(".js-youtube-title").hide();
      parent.css({
        background: "none",
      });
    } else {
      player.mute();
      _this.show();
      $("#player").css({
        "z-index": "-1",
      });
      parent.find(".js-youtube-title").show();
      parent.css({
        background:
          "linear-gradient(317.8deg, rgba(47, 40, 124, 0) 46%, rgba(101, 39, 117, 0.6) 84.98%), linear-gradient(0deg, rgba(23, 41, 39, 0.3), rgba(23, 41, 39, 0.3))",
      });
    }
  });
}

window.player = player;
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.onPlayerReady = onPlayerReady;

$(function () {
  objectFitImages();
  Menu.init();
  Controls.init();
  Sliders.init();
  Timer.init();
  Forms.init();
  // youtubeShowVideo();
});

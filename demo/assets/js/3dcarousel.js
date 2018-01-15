$(function() {
  var carousel = document.getElementById("carousel");
  var COUNT = 8;
  var ANGLE = 360 / COUNT; 

  // 1. Initialize eg.Axes
  var axes = new eg.Axes({
    rotate: {
      range: [0, 360],
      circular: true
    }
  });

  // 2. attach event handler
  axes.on({
    "change": function(e) {
      var pos = e.pos;

      carousel.style[eg.Axes.TRANSFORM] = "translateZ(-253px) rotateY(" + (pos.rotate) + "deg)";
    },
    "release": function (e) {
      var destPos = e.destPos;

      e.setTo({"rotate": Math.round(destPos.rotate/ANGLE) * ANGLE }, 500);
    }
  });

  // 3. Initialize a inputType and connect it
  axes.connect("rotate", new eg.Axes.PanInput("#carouselWrapper")).connect("rotate", new eg.Axes.WheelInput("#carouselWrapper", {useNormalized: false}));
});

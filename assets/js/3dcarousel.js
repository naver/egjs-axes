$(function() {
  const carousel = document.getElementById("carousel");
  const COUNT = 8;
  const ANGLE = 360 / COUNT; 

  // 1. Initialize eg.Axes
  const axes = new eg.Axes({
    rotate: {
      range: [0, 360],
      circular: true
    }
  });

  // 2. attach event handler
  axes.on({
    "change": ({pos}) => {
      carousel.style[eg.Axes.TRANSFORM] = "translateZ(-253px) rotateY(" + pos.rotate + "deg)";
    },
    "release": ({destPos, setTo}) => {
      // you can controll animation!
      setTo({"rotate": Math.round(destPos.rotate/ANGLE) * ANGLE} , 500);
    },
  });

  // 3. Initialize a inputType and connect it
  axes.connect("rotate", new eg.Axes.PanInput("#carouselWrapper"));
});

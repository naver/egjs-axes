$(function () {
  const images = Array.prototype.slice.call(document.querySelectorAll(
    ".car_rotate img"));
  const imagesNum = images.length;
  const ape = 360 / imagesNum; // angle per each

  const axes = new eg.Axes({
    axis: {
      angle: {
        range: [0, 360],
        circular: true
      }
    },
    deceleration: 0.01
  }).on("change", ({pos}) => {
    const index = Math.min(Math.round(pos.angle % 360 / ape), imagesNum - 1);
    images.map((v, i) => {
      v.style.display = i === index ? "inline-block" : "none";
    });
  });
  axes.connect("angle", new eg.Axes.PanInput(".car_rotate"));
});

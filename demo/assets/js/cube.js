$(function () {
  const box = document.getElementById("box");
  const axes = new eg.Axes({
    axis: {
      rotateX: {
        range: [0, 360],
        circular: true
      },
      rotateY: {
        range: [0, 360],
        circular: true
      }
    },
    deceleration: 0.0024
  }).on("change", ({pos}) => {
    box.style[eg.Axes.TRANSFORM] =
      `rotateY(${pos.rotateX}deg) rotateX(${pos.rotateY}deg)`;
  }).connect("rotateX rotateY", new eg.Axes.PanInput("#area"))
  .setTo({
    "rotateX": 40,
    "rotateY": 315
  }, 100);
});

var roulette = document.getElementById("roulette");
var angleText = document.getElementById("angle-text");
var input = new eg.Axes.RotatePanInput("#area");

// create eg.Axes with option
var axes = new eg.Axes({
  angle: {
    range: [-720, 720]
  }
}).on("change", function(e) {
  roulette.style.transform="rotate(" + e.pos.angle + "deg)";
  angleText.textContent = e.pos.angle + "deg";
});

axes.connect("angle", input);
axes.setTo({angle: 0});

setTimeout(() => {
	input.release();
}, 3000)

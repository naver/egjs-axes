const checkbox = document.getElementById('check');
const slow = document.getElementById('slow');
const average = document.getElementById('average');
const fast = document.getElementById('fast');
const point = document.getElementById('point');
var rotate = document.getElementById("rotate");
var angleText = document.getElementById("angle-text");
var input = new eg.Axes.RotatePanInput("#area");
var animationTime = 3000;
var lastTime = 0;

var axes = new eg.Axes({
  angle: {
    range: [0, 360],
		circular: true
  }
}, {
	minimumDuration: animationTime,
	maximumDuration: animationTime,
}).on("animationStart", function(e) {
	lastTime = new Date().getTime();
	const updateButtons = [...document.getElementsByClassName("update")];
	updateButtons.forEach(button => {
		button.classList.add("active");
	});
}).on("change", function(e) {
	const remain = (animationTime - (new Date().getTime() - lastTime));
	rotate.style.transform="rotate(" + (e.pos.angle) + "deg)";
	point.style.transform="translateX(" + (Math.random() * 3) + "px)";
	point.style.transform="translateY(" + (Math.random() * 3) + "px)";
	if (remain > 0) {
		angleText.textContent = "done in " + remain + " ms";
	} else {
		angleText.textContent = "idle";
	}
}).on("finish", function(e) {
	const updateButtons = [...document.getElementsByClassName("update")];
	updateButtons.forEach(button => {
		button.classList.remove("active");
	});
	angleText.textContent = "idle";
});

axes.setTo({angle: 210});

function rotateTo(pos) {
	const nextpos = axes.axm.get()["angle"] > pos ? pos : pos - 360;
	axes.setTo({"angle": nextpos }, animationTime);
}

function updateTo(pos) {
	const nextpos = axes.axm.get()["angle"] > pos ? pos : pos - 360;
	axes.updateAnimation({destPos: {"angle": nextpos } });
}

function updateDuration(duration) {
	slow.classList.remove("active");
	average.classList.remove("active");
	fast.classList.remove("active");
	if (duration === 1000) {
		fast.classList.add("active");
	} else if (duration === 3000) {
		average.classList.add("active");
	} else {
		slow.classList.add("active");
	}
	animationTime = duration;
	axes.options.minimumDuration = duration;
	axes.options.maximumDuration = duration;
	axes.updateAnimation({duration: animationTime, restart: true });
}

function toggleConnect() {
  if (checkbox.checked) {
		axes.connect("angle", input);
  } else {
		axes.disconnect();
  }
}

function toggleCheckbox() {
	checkbox.checked = !checkbox.checked;
	toggleConnect();
}

checkbox.addEventListener('change', () => {
	toggleConnect();
});

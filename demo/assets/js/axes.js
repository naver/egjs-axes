(function () {
	var SUPPORT_TOUCH = "ontouchstart" in window
	var delegateTarget = document.getElementById("delegateTarget");
	var grid = document.getElementById("grid");
	var gridRect = grid.getBoundingClientRect();
	var size = [gridRect.width - 40, (gridRect.width/3*2) - 40];
	var uiWrapper = document.getElementById("uiWrapper");
	var ui = uiWrapper.querySelector(".ui");
	var inputType = document.getElementById("inputType");
	inputType.className = SUPPORT_TOUCH ? "touch" : "mouse";
	var pan = inputType.querySelector(".pan");
	var zoom = inputType.querySelector(".zoom");
	
	uiWrapper.style.width = (size[0] + 40)+ "px";
	uiWrapper.style.height = size[1] + "px";
	var axes = new eg.Axes({
		axis: {
			panX: {
				range: [0, size[0]],
				bounce: 20
			},
			panY: {
				range: [0, size[1]],
				bounce: 20
			},
			zoom: {
				range: [1, 10],
				bounce: 1
			}
		},
		minimumDuration: 300
	}).on({
		"hold": function(event) {
			pan.className = "blinking pan";
		},
		"change": function(event) {
			if (event.delta.panX || event.delta.panY) {
				pan.textContent = "panX: " + (+event.pos.panX.toFixed(0)) + ", panY: " + (+event.pos.panY.toFixed(0));
			}
			if (event.delta.zoom) {
				zoom.textContent = "zoom: " + event.pos.zoom.toFixed(2);
				if (!/blinking/.test(zoom.className)) {
					zoom.className = "blinking zoom";
				}
			}
			gridView.render(event.pos.panX, event.pos.panY, event.pos.zoom);
			ui.style[eg.Axes.TRANSFORM] = "translate(" + event.pos.panX + "px, " + event.pos.panY + "px) scale(" + event.pos.zoom + ")";
		},
		"release": function(event) {
			if (!event.delta.panX && !event.delta.panY) {
				pan.className = "pan";
			}
		},
		"animationEnd": function(event) {
			pan.className = "pan";
			setTimeout(function() {
				zoom.className = "zoom";
			}, 300);
		}
	});
	
	var gridView = new AxesGridView(grid, axes.options.axis.panX, axes.options.axis.panY, axes.options.axis.zoom);

	var panInput = new eg.Axes.PanInput(delegateTarget);
	var zoomInput = SUPPORT_TOUCH ? new eg.Axes.PinchInput(delegateTarget) : new eg.Axes.WheelInput(delegateTarget);


	axes.connect("panX panY", panInput)
		.connect("zoom", zoomInput)
		.setTo({panX: size[0]/2 + 20, panY: size[1]/2});
})();

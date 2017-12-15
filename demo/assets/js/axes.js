/* AxesGridView for test */
function AxesGridView(container, axisX, axisY, axisZoom) {
  this.container = container;
  this.axisX = axisX;
  this.axisY = axisY;
  this.axisZoom = axisZoom;
  this.canvas = document.createElement("canvas");
  this.canvas.width = (axisX.range[1] - axisX.range[0]) + axisX.bounce[0] + axisX.bounce[1];
  this.canvas.height = (axisY.range[1] - axisY.range[0]) + axisY.bounce[0] + axisY.bounce[1]; 
  this.ctx = this.canvas.getContext("2d");
  this.container.appendChild(this.canvas);

  this.render(axisX.range[0], axisX.range[0]);
}
AxesGridView.prototype.render = function(x, y, zoom) {

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this._renderGrid();
  this._renderPoint(x, y, zoom);
};

AxesGridView.prototype._renderGrid = function() {
  var ctx = this.ctx;
  var canvas = this.canvas;
  var range = [
    this.axisX.bounce[0],
    this.axisY.bounce[0], 
    canvas.width - this.axisX.bounce[0], 
    canvas.height - this.axisY.bounce[0]
  ];

  ctx.fillStyle = "#e6e6e6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(range[0], range[1], range[2] - this.axisX.bounce[1], range[3] - this.axisY.bounce[1]);
  ctx.beginPath();
  ctx.lineWidth = 0.25;

  let i;

  for (i = 0; i < canvas.width; i += 10) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }
  for (i = 0; i < canvas.width; i += 10) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }

  ctx.strokeStyle = "#0000ff";
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.closePath();

  // bounce area
  ctx.beginPath();
  ctx.lineWidth = 0.5;

  // horizontal
  ctx.moveTo(range[0], range[1]);
  ctx.lineTo(canvas.width - this.axisX.bounce[1], range[1]);
  ctx.moveTo(range[0], canvas.height - this.axisY.bounce[1]);
  ctx.lineTo(canvas.width - this.axisX.bounce[1], canvas.height - this.axisY.bounce[1]);

  // vertical
  ctx.moveTo(range[0], range[1]);
  ctx.lineTo(range[0], canvas.height - this.axisY.bounce[1]);
  ctx.moveTo(canvas.width - this.axisX.bounce[1], range[1]);
  ctx.lineTo(canvas.width - this.axisX.bounce[1], canvas.height - this.axisY.bounce[1]);

  ctx.strokeStyle = "#888";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "bolder 10px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("(panX: " + this.axisX.range[0] + ", panY: " + this.axisY.range[0] + ")", range[0], range[1]);
  ctx.textAlign = "right";
  ctx.textBaseline = "hanging";
  ctx.fillText("(panX: " + this.axisX.range[1] + ", panY: " + this.axisY.range[1] + ")", range[2], range[3]);
};

AxesGridView.prototype._renderPoint = function(x, y, zoom) {
  zoom = Number(zoom);
  var ctx = this.ctx;
  ctx.globalAlpha = 0.7;
  ctx.arc(
    this.axisX.bounce[0] + x,
    this.axisY.bounce[0] + y,
    10 * zoom, 0, 2 * Math.PI, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.font = "bolder " + (zoom * 10) + "px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("(panX: " + x.toFixed(0) + ", panY: " + y.toFixed(0) + ", zoom: " + zoom.toFixed(2) + ")", 
    this.axisX.bounce[0] + x,
    this.axisY.bounce[0] + y - 10 * zoom);
};

$(function () {
  // fit size
  function fit() {
    const baseSize = document.getElementById("inputTypeWrapper").getBoundingClientRect().width;
    const size = baseSize < 600 ?
      [baseSize - 40, (baseSize/3*2) - 40] :
      [baseSize/2 - 50, (baseSize/3*2)/2];

    const uiWrapper = document.getElementById("uiWrapper");
    uiWrapper.style.width = (size[0] + 40)+ "px";
    uiWrapper.style.height = size[1] + "px";
    if (baseSize > 600) {
      uiWrapper.style.marginRight = "20px";
      uiWrapper.style.marginTop = "20px";
    }
    return size;
  }

  // stop blicking
  function stopBlinking(event) {
    if (event) {
      if (!event.delta.panX && !event.delta.panY) {
        pan.classList.remove("blinking");
      }
      if (!event.delta.zoom) {
        setTimeout(() => zoom.classList.remove("blinking"), 300);
      }
    } else {
      pan.classList.remove("blinking");
      setTimeout(() => zoom.classList.remove("blinking"), 300);
    }
  }

  const SUPPORT_TOUCH = "ontouchstart" in window;
  const delegateTarget = document.getElementById("delegateTarget");
  const size = fit();
  const ui = uiWrapper.querySelector(".ui");
  const inputType = document.getElementById("inputType");
  inputType.className = SUPPORT_TOUCH ? "touch" : "mouse";
  const pan = inputType.querySelector(".pan");
  const zoom = inputType.querySelector(".zoom");

  // 1. Initialize eg.Axes
  const axes = new eg.Axes({
    panX: {
      range: [0, size[0]],
      bounce: 20
    },
    panY: {
      range: [0, size[1]],
      bounce: 20
    },
    zoom: {
      range: [1, 5],
      bounce: 1
    }
  }, {
    minimumDuration: 300
  });

  // draw grid
  const gridView = new AxesGridView(document.getElementById("grid"),
    axes.axis.panX,
    axes.axis.panY,
    axes.axis.zoom);
  
  // 2. attach event handler
  axes.on({
    "hold": event => !SUPPORT_TOUCH && pan.classList.add("blinking"),
    "change": function (e) {
      var pos = e.pos;
      var delta = e.delta;
      var holding = e.holding;
      console.log(e);
      if (delta.panX || delta.panY) {
        pan.textContent = 
          `panX: ${(+pos.panX.toFixed(0))}, panY: ${(+pos.panY.toFixed(0))}`;
          if (e.inputEvent && e.inputEvent.type === "keydown") {
              pan.classList.add("keyboard");
          } else {
            pan.classList.remove("keyboard");
          }
          holding && !pan.classList.contains("blinking") &&
          pan.classList.add("blinking");
      }
      if (delta.zoom) {
        zoom.textContent = `zoom: ${pos.zoom.toFixed(2)}`;
        !zoom.classList.contains("blinking") && zoom.classList.add("blinking");
      }
      gridView.render(pos.panX, pos.panY, pos.zoom);
      ui.style[eg.Axes.TRANSFORM] = 
        `translate3d(${pos.panX}px, ${pos.panY}px, 0) scale(${pos.zoom})`;
    },
    "release": event => stopBlinking(event),
    "animationEnd": () => stopBlinking()
  });

  // 3. Initialize inputTypes and connect it
  axes.connect("panX panY", new eg.Axes.PanInput(delegateTarget))
  axes.connect("panX panY", new eg.Axes.MoveKeyInput(delegateTarget, {
    scale: [5, -5]
  }))
    .connect("zoom", SUPPORT_TOUCH ?
      new eg.Axes.PinchInput(delegateTarget) :
      new eg.Axes.WheelInput(delegateTarget));

  // 4. move to position 
  axes.setTo({panX: size[0]/2 + 20, panY: size[1]/2});
});

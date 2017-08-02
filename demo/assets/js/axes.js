$(function () {
  const SUPPORT_TOUCH = "ontouchstart" in window;
  const delegateTarget = document.getElementById("delegateTarget");

  const grid = document.getElementById("grid");
  const gridRect = grid.getBoundingClientRect();
  const size = [gridRect.width - 40, (gridRect.width/3*2) - 40];

  const uiWrapper = document.getElementById("uiWrapper");
  uiWrapper.style.width = (size[0] + 40)+ "px";
  uiWrapper.style.height = size[1] + "px";
  const ui = uiWrapper.querySelector(".ui");

  const inputType = document.getElementById("inputType");
  inputType.className = SUPPORT_TOUCH ? "touch" : "mouse";
  const pan = inputType.querySelector(".pan");
  const zoom = inputType.querySelector(".zoom");

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

  const axes = new eg.Axes({
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
        range: [1, 5],
        bounce: 1
      }
    },
    minimumDuration: 300
  }).on({
    "hold": event => !SUPPORT_TOUCH && pan.classList.add("blinking"),
    "change": ({pos, delta, holding}) => {
      if (delta.panX || delta.panY) {
        pan.textContent = 
          `panX: ${(+pos.panX.toFixed(0))}, panY: ${(+pos.panY.toFixed(0))}`;
        if (holding && !pan.classList.contains("blinking")) {
          pan.classList.add("blinking");
        }
      }
      if (delta.zoom) {
        zoom.textContent = `zoom: ${pos.zoom.toFixed(2)}`;
        !zoom.classList.contains("blinking") && zoom.classList.add("blinking");
      }
      gridView.render(pos.panX, pos.panY, pos.zoom);
      ui.style[eg.Axes.TRANSFORM] = 
        `translate(${pos.panX}px, ${pos.panY}px) scale(${pos.zoom})`;
    },
    "release": event => stopBlinking(event),
    "animationEnd": () => stopBlinking()
  });
  const gridView = new AxesGridView(grid,
    axes.options.axis.panX,
    axes.options.axis.panY,
    axes.options.axis.zoom);
  axes.connect("panX panY", new eg.Axes.PanInput(delegateTarget))
    .connect("zoom", SUPPORT_TOUCH ?
      new eg.Axes.PinchInput(delegateTarget) :
      new eg.Axes.WheelInput(delegateTarget))
    .setTo({panX: size[0]/2 + 20, panY: size[1]/2});
});

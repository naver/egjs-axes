const wrapper = document.getElementById("content");
const ui0 = document.getElementById("ui0");
const ui1 = document.getElementById("ui1");

const axes0 = new eg.Axes(
  {
    zoom: {
      range: [1, 4],
    },
  },
  {
    deceleration: 0.00002,
  }
);

axes0.on({
  animationStart: (e) => {
    if (e && e.inputEvent) {
      e.inputEvent.__childrenAxesAlreadyChanged = false;
    }
  },
  change: (e) => {
    var pos = e.pos;

    ui0.style[
      eg.Axes.TRANSFORM
    ] = `translate3d(200px, 200px, 0) scale(${pos.zoom})`;
    ui0.innerHTML = `${pos.zoom.toFixed(2)}`;
  },
});

axes0.connect(
  "zoom",
  new eg.Axes.WheelInput(wrapper, {
    scale: 1 / 1000,
    useNormalized: false,
    useAnimation: true,
  })
);
axes0.setTo({ zoom: 3 });

const axes1 = new eg.Axes({
  zoom: {
    range: [1, 4],
  },
});

axes1.on({
  change: (e) => {
    var pos = e.pos;

    ui1.style[
      eg.Axes.TRANSFORM
    ] = `translate3d(200px, 200px, 0) scale(${pos.zoom})`;
    ui1.innerHTML = `${pos.zoom.toFixed(2)}`;
  },
});

axes1.connect(
  "zoom",
  new eg.Axes.WheelInput(wrapper, {
    scale: 1 / 1000,
    useNormalized: false,
    useAnimation: false,
  })
);
axes1.setTo({ zoom: 3 });

const wrapper = document.getElementById("content");
const ui0 = document.getElementById("ui0");
const ui1 = document.getElementById("ui1");

const axes0 = new eg.Axes(
  {
    zoom: {
      range: [1, 4],
      bounce: 1,
    },
  },
  {
    minimumDuration: 300,
  }
);

axes0.on({
  change: (e) => {
    var pos = e.pos;

    ui0.style[
      eg.Axes.TRANSFORM
    ] = `translate3d(200px, 200px, 0) scale(${pos.zoom})`;
    ui0.innerHTML = `${pos.zoom.toFixed(2)}`;
    if (e && e.inputEvent) {
      e.inputEvent.__childrenAxesAlreadyChanged = false;
    }
  },
});

axes0.connect("zoom", new eg.Axes.WheelInput(wrapper));
axes0.setTo({ zoom: 3 });

const axes1 = new eg.Axes(
  {
    zoom: {
      range: [1, 4],
      bounce: 1,
    },
  },
  {
    minimumDuration: 300,
  }
);

axes1.on({
  change: (e) => {
    var pos = e.pos;

    ui1.style[
      eg.Axes.TRANSFORM
    ] = `translate3d(200px, 200px, 0) scale(${pos.zoom})`;
    ui1.innerHTML = `${pos.zoom.toFixed(2)}`;
  },
});

axes1.connect("zoom", new eg.Axes.WheelInput(wrapper, { useAnimation: false }));
axes1.setTo({ zoom: 3 });

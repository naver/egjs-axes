/**
 * Copyright (c) NAVER Corp.
 */


var mv = new eg.MovableCoord({
  min: [0, 0],
  max: [100, 100],
  bounce: [100, 50, 100, 50],
  circular: [true, false, true, false]
}).on({
  "hold": (e) => {
    console.info("hold", e);
  },
  "change" : (e) => {
    console.info("change", e.pos, e);
  },
  "animationStart" : (e) => {
    console.info("animationStart", e, console.time("Animation"));
  },
  "animationEnd" : (e) => {
    console.info("animationEnd", e, console.timeEnd("Animation"));
  }
})

console.log("Hello eg.MovableCoord!!!", mv);


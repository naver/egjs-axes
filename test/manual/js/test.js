/**
 * Copyright (c) NAVER Corp.
 */


var axes = new eg.Axes({
  interruptable: true,
  axis: {
    x: {
      range: [0, 100],
      bounce: [50, 50],
      margin: [0, 0],
      circular: false
    },
    y: {
      range: [0, 100],
      bounce: 100,
      margin: 0,
      circular: true
    }    
  }
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

console.log("Hello eg.Axes!!!", axes);


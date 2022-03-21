import React, { useEffect } from "react";

import Axes, { PinchInput, WheelInput } from "../../../../src/index";
import "../../css/demos/bubble.css";

function Bubble() {
  useEffect(() => {
    var bubbles = document.querySelector(".bubbles");
    var button = document.querySelector(".add");

    button.addEventListener("click", createBubble);
    function createBubble() {
        var element = document.createElement("div");
        var size = parseInt(Math.random() * 80 + 60);
        var r = parseInt(Math.random() * 220 + 15, 10);
        var g = parseInt(Math.random() * 220 + 15, 10);
        var b = parseInt(Math.random() * 220 + 15, 10);
        var left = parseInt(Math.random() * 85 + 5, 10);
        var top = parseInt(Math.random() * 85 + 5, 10);

        element.className = "bubble";
        element.style.width = size + "px";
        element.style.height = size + "px";
        element.style.background = "rgb(" + r + "," + g + "," + b + ")";
        element.style.left = left + "%";
        element.style.top = top + "%";
        bubbles.appendChild(element);
        createAxes(element);
    }
    function createAxes(target) {
        // 1. Initialize eg.Axes
        var axes = new Axes({
            zoom: {
                range: [0.5, 3],
            },
        }, {
            deceleration: 0.01
        }, {
            zoom: 1,
        });

        // 2. attach event handler
        axes.on("change", function (e) {
            var pos = e.pos;
            target.style.transform = "scale(" + pos.zoom + ")";
        });

        // 3. Initialize a inputType and connect it
        axes.connect("zoom", new PinchInput(target)).connect("zoom", new WheelInput(target, {scale: 0.3}));
    }

    createBubble();
  });

  return (
    <div className="demobox" codepen="bubble">
      <p>You can create bubble that can zoom using pinch(touch) or wheel.</p>
      <div id="wrapper">
          <button className="add"></button>
        <div className="bubbles"></div>
      </div>
    </div>
  );
}

export default Bubble;

import React, { useEffect } from "react";

import Axes, { PanInput, MoveKeyInput } from "../../../../axes/src/index";
import "../../css/demos/cube.css";

const Cube = () => {
  useEffect(() => {
    const area = document.getElementById("area");
    const box = document.getElementById("box");
    const container = document.getElementById("container");
    const areaWidth = area.getBoundingClientRect().width;

    // 1. Initialize eg.Axes
    const axes = new Axes(
      {
        offsetX: {
          range: [-(areaWidth / 4), areaWidth / 4],
        },
        offsetY: {
          range: [-25, 25],
        },
        rotateX: {
          range: [0, 360],
          circular: true,
        },
        rotateY: {
          range: [0, 360],
          circular: true,
        },
      },
      {
        deceleration: 0.0024,
      }
    );

    // 2. attach event handler
    axes.on("change", ({ pos }) => {
      box.style[
        "transform"
      ] = `rotateY(${pos.rotateX}deg) rotateX(${pos.rotateY}deg)`;
      container.style[
        "transform"
      ] = `translate3d(${pos.offsetX}px, ${pos.offsetY}px, 0)`;
    });

    // 3. Initialize a inputType and connect it
    axes
      .connect(
        "offsetX offsetY",
        new PanInput(area, { inputButton: ["right"] })
      )
      .connect("rotateX rotateY", new PanInput(area))
      .connect("rotateX rotateY", new MoveKeyInput(area, { scale: [10, -10] }));

    // 4. move to position
    axes.setTo({
      offsetX: 0,
      offsetY: 0,
      rotateX: 40,
      rotateY: 315,
    });
  }, []);

  return (
    <div>
      <p>You can rotate the cube using two axes.</p>
      <div id="area">
        <div id="container">
          <div id="box">
            <div
              className="face metal-linear"
              style={{
                transform:
                  "rotateX(0deg) rotateY(0deg) translate3d(-50px,-50px,50px)",
              }}
            >
              1
            </div>
            <div
              className="face metal-linear"
              style={{
                transform: "rotateY(-90deg) translate3d(0px,-50px,100px)",
              }}
            >
              2
            </div>
            <div
              className="face metal-linear"
              style={{ transform: "rotateY(90deg) translate3d(0px,-50px,0px)" }}
            >
              3
            </div>
            <div
              className="face metal-linear"
              style={{
                transform: "rotateX(90deg) translate3d(-50px,0px,100px)",
              }}
            >
              4
            </div>
            <div
              className="face metal-linear"
              style={{
                transform: "rotateY(180deg) translate3d(50px,-50px,50px)",
              }}
            >
              5
            </div>
            <div
              className="face metal-linear"
              style={{
                transform: "rotateX(-90deg) translate3d(-50px,0px,0px)",
              }}
            >
              6
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cube;

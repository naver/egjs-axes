import React, { useEffect, useRef } from "react";
import { useAxes, PanInput, MoveKeyInput } from "@egjs/react-axes";
import "../../css/demos/cube.css";

export default function Cube() {
  const { connect, setAxis, offsetX, offsetY, rotateX, rotateY } = useAxes(
    {
      offsetX: {
        range: [0, 0],
        startPos: 0,
      },
      offsetY: {
        range: [-25, 25],
        startPos: 0,
      },
      rotateX: {
        range: [0, 360],
        circular: true,
        startPos: 40,
      },
      rotateY: {
        range: [0, 360],
        circular: true,
        startPos: 315,
      },
    },
    {
      deceleration: 0.0024,
    },
  );

  useEffect(() => {
    const cubearea = document.getElementById("area");
    const areaWidth = cubearea.getBoundingClientRect().width;
    setAxis({
      offsetX: {
        range: [-(areaWidth / 4), areaWidth / 4],
      },
    });
    connect("offsetX offsetY", new PanInput("#area", { inputButton: ["right"] }));
    connect("rotateX rotateY", new PanInput("#area"));
    connect("rotateX rotateY", new MoveKeyInput("#area", { scale: [10, -10] }));
  }, []);

  return (
    <div>
      <p>You can rotate the cube using two axes.</p>
      <div id="area">
        <div id="container" style={{ transform: `translate3d(${offsetX}px, ${offsetY}px, 0)` }}>
          <div id="box" style={{ transform: `rotateY(${rotateX}deg) rotateX(${rotateY}deg)` }}>
            <div className="face metal-linear" style={{ transform: "rotateX(0deg) rotateY(0deg) translate3d(-50px,-50px,50px)" }}>1</div>
            <div className="face metal-linear" style={{ transform: "rotateY(-90deg) translate3d(0px,-50px,100px)" }}>2</div>
            <div className="face metal-linear" style={{ transform: "rotateY(90deg) translate3d(0px,-50px,0px)" }}>3</div>
            <div className="face metal-linear" style={{ transform: "rotateX(90deg) translate3d(-50px,0px,100px)" }}>4</div>
            <div className="face metal-linear" style={{ transform: "rotateY(180deg) translate3d(50px,-50px,50px)" }}>5</div>
            <div className="face metal-linear" style={{ transform: "rotateX(-90deg) translate3d(-50px,0px,0px)" }}>6</div>
          </div>
        </div>
      </div>
    </div>
  );
};

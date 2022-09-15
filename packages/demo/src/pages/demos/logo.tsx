import React, { useEffect, useState } from "react";
import { useAxes, PanInput } from "@egjs/react-axes";
import "../../css/demos/logo.css";

import SquareIcon from "../../../static/img/demos/logo/square.svg";
import TriangleIcon from "../../../static/img/demos/logo/triangle.svg";
import CircleIcon from "../../../static/img/demos/logo/circle.svg";
import XIcon from "../../../static/img/demos/logo/x.svg";
import YIcon from "../../../static/img/demos/logo/y.svg";
import ZIcon from "../../../static/img/demos/logo/z.svg";

export default function Logo() {
  const [offsetX1, setOffsetX1] = useState(null);
  const [offsetX2, setOffsetX2] = useState(null);
  const offsetY = 25;
  const square = useAxes({
    x: {
      range: [-200, 150],
      startPos: -125,
    },
    y: {
      range: [0, 275],
      startPos: 55,
    },
  });
  const triangle = useAxes({
    x: {
      range: [-200, 150],
      startPos: -125,
    },
    y: {
      range: [0, 275],
      startPos: 135,
    },
  });
  const circle = useAxes({
    x: {
      range: [-200, 150],
      startPos: -125,
    },
    y: {
      range: [0, 275],
      startPos: 215,
    },
  });
  const x = useAxes({
    x: {
      range: [-200, 150],
      startPos: 75,
    },
    y: {
      range: [0, 275],
      startPos: 55,
    },
  });
  const y = useAxes({
    x: {
      range: [-200, 150],
      startPos: 75,
    },
    y: {
      range: [0, 275],
      startPos: 135,
    },
  });
  const z = useAxes({
    x: {
      range: [-200, 150],
      startPos: 75,
    },
    y: {
      range: [0, 275],
      startPos: 215,
    },
  });

  useEffect(() => {
    const container = document.getElementById("container");
    const containerWidth = container.getBoundingClientRect().width;
    setOffsetX1(60 + containerWidth / 2);
    setOffsetX2(containerWidth / 2);
    square.connect("x y", new PanInput("#square"));
    triangle.connect("x y", new PanInput("#triangle"));
    circle.connect("x y", new PanInput("#circle"));
    x.connect("x y", new PanInput("#x"));
    y.connect("x y", new PanInput("#y"));
    z.connect("x y", new PanInput("#z"));
    [square, triangle, circle, x, y, x].forEach(axes => {
      axes.setAxis({
        x: {
          range: [-(containerWidth / 2) + 10, (containerWidth / 2) - 60],
        }
      });
    })
  }, []);

  return (
    <div>
      <div id="container" style={{ opacity: `${offsetX1 ? "1" : "0"}` }}>
        <div id="square" className="item" style={{ transform: `translateX(${square.x}px) translateY(${square.y}px)` }}><SquareIcon /></div>
        <div id="triangle" className="item light" style={{ transform: `translateX(${triangle.x}px) translateY(${triangle.y}px)` }}><TriangleIcon /></div>
        <div id="circle" className="item" style={{ transform: `translateX(${circle.x}px) translateY(${circle.y}px)` }}><CircleIcon /></div>
        <div id="x" className="item bold" style={{ transform: `translateX(${x.x}px) translateY(${x.y}px)` }}><XIcon /></div>
        <div id="y" className="item" style={{ transform: `translateX(${y.x}px) translateY(${y.y}px)` }}><YIcon /></div>
        <div id="z" className="item bold" style={{ transform: `translateX(${z.x}px) translateY(${z.y}px)` }}><ZIcon /></div>
        <svg className="line"><line x1={ offsetX1 + square.x } y1={ offsetY + square.y } x2={ offsetX2 + x.x } y2={ offsetY + x.y } stroke="black" strokeWidth="4"/></svg>
        <svg className="line"><line x1={ offsetX1 + square.x } y1={ offsetY + square.y } x2={ offsetX2 + y.x } y2={ offsetY + y.y } stroke="black" strokeWidth="4"/></svg>
        <svg className="line"><line x1={ offsetX1 + triangle.x } y1={ offsetY + triangle.y } x2={ offsetX2 + x.x } y2={ offsetY + x.y } stroke="black" strokeWidth="4"/></svg>
        <svg className="line"><line x1={ offsetX1 + triangle.x } y1={ offsetY + triangle.y } x2={ offsetX2 + y.x } y2={ offsetY + y.y } stroke="black" strokeWidth="4"/></svg>
        <svg className="line"><line x1={ offsetX1 + triangle.x } y1={ offsetY + triangle.y } x2={ offsetX2 + z.x } y2={ offsetY + z.y } stroke="black" strokeWidth="4"/></svg>
        <svg className="line"><line x1={ offsetX1 + circle.x } y1={ offsetY + circle.y } x2={ offsetX2 + y.x } y2={ offsetY + y.y } stroke="black" strokeWidth="4"/></svg>
        <svg className="line"><line x1={ offsetX1 + circle.x } y1={ offsetY + circle.y } x2={ offsetX2 + z.x } y2={ offsetY + z.y } stroke="black" strokeWidth="4"/></svg>
      </div>
    </div>
  );
};

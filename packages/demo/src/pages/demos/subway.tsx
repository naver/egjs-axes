import React, { useState, useEffect, useRef } from "react";
import { useAxes, PanInput, PinchInput, WheelInput } from "@egjs/react-axes";
import "../../css/demos/subway.css";

export default function Subway() {
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [range, setRange] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const { connect, setTo, setAxis, onChange, zoom } = useAxes(
    {
      x: {
        range: [0, 0],
        bounce: 100,
      },
      y: {
        range: [0, 0],
        bounce: 100,
      },
      zoom: {
        range: [0, 1],
      },
    },
    {
      deceleration: 0.003,
    },
  );

  const getZoomedOffset = (value, zoom, beforeZoom) => {
    return -(value / zoom - value / beforeZoom);
  };

  onChange(({ pos, delta, inputEvent, set }) => {
    if (inputEvent && delta.zoom) {
      const center = SUPPORT_TOUCH
        ? inputEvent.center
        : {
            x: inputEvent.layerX,
            y: inputEvent.layerY,
          };

      const beforeZoom = pos.zoom - delta.zoom;
      const newX = pos.x + getZoomedOffset(center.x, pos.zoom, beforeZoom);
      const newY = pos.y + getZoomedOffset(center.y, pos.zoom, beforeZoom);
      const wrapperSize = wrapper.current.getBoundingClientRect().width;
      const newRange = range + getZoomedOffset(wrapperSize, pos.zoom, beforeZoom);
      setCurrentPos({ x: newX, y: newY });
      set({ x: newX, y: newY });
      setRange(newRange);
      setAxis({
        x: {
          range: [0, newRange],
        },
        y: {
          range: [0, newRange],
        },
      });
    } else {
      setCurrentPos({ x: pos.x, y: pos.y });
    }
  });

  useEffect(() => {
    const SUPPORT_TOUCH = "ontouchstart" in window;
    const IMAGE_SIZE = 3000;
    const wrapperSize = wrapper.current.getBoundingClientRect().width;
    const baseScale = wrapperSize / IMAGE_SIZE;
    wrapper.current.style.height = wrapperSize + "px";
    setAxis({
      zoom: {
        range: [baseScale, 1],
      },
    });
    setTo({
      zoom: baseScale,
    });
    connect("zoom", SUPPORT_TOUCH ? new PinchInput(wrapper) : new WheelInput(wrapper, { scale: Math.abs(baseScale) }));
    connect("x y", new PanInput(wrapper, { scale: [-1, -1] }));
  }, []);

  return (
    <div>
      <p>You can create maps that can zoom using three axes.</p>
      <div id="zoomWrapper" ref={wrapper}>
        <img
          id="subway"
          src={require("@site/static/img/demos/subway/subway.png").default}
          style={{ transform: `scale(${zoom}) translate3d(${-currentPos.x}px, ${-currentPos.y}px, 0)` }}
        />
      </div>
    </div>
  );
};

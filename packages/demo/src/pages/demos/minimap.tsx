import React, { useState, useEffect } from "react";
import { useAxes, PanInput, MoveKeyInput, WheelInput } from "@egjs/react-axes";
import "../../css/demos/minimap.css";

export default function Minimap() {
  // raw-image 1280 * 1677
  // mini-map 128 * 167.7
  const [viewHeight, setViewHeight] = useState(0);
  const [pointerWidth, setPointerWidth] = useState(0);
  const [scale, setScale] = useState([0, 0]);
  const RAW_IMAGE_WIDTH = 1280;
  const RAW_IMAGE_HEIGHT = 1677;
  const MINIMAP_WIDTH = 128;
  const IMAGE_RATE = RAW_IMAGE_HEIGHT / RAW_IMAGE_WIDTH;

  const { connect, setAxis, rawX, rawY } = useAxes(
    {
      rawX: {
        range: [0, 0],
        bounce: 100,
      },
      rawY: {
        range: [0, 0],
        bounce: 100,
      },
    },
    {
      deceleration: 0.0024,
    }
  );

  useEffect(() => {
    const viewarea = document.getElementById("imageView");
    const viewRect = viewarea.getBoundingClientRect();
    const viewWidth = viewarea.getBoundingClientRect().width;
    const viewHeight = viewWidth * IMAGE_RATE;
    const minimap = document.getElementById("minimap");
    const minimapRect = minimap.getBoundingClientRect();
    const pointer = document.getElementById("minimap-pointer");
    const pointerRect = pointer.getBoundingClientRect();

    connect("rawX rawY", new PanInput(viewarea, { scale: [-1, -1] }));
    connect("rawX rawY", new MoveKeyInput(viewarea, { scale: [10, -10] }));
    connect("rawY rawX", new WheelInput(viewarea, { scale: -30, useNormalized: true }));
    setViewHeight(viewHeight);
    setPointerWidth((viewWidth / RAW_IMAGE_WIDTH) * MINIMAP_WIDTH);
    setScale([
      (minimapRect.width - pointerRect.width) /
        (RAW_IMAGE_WIDTH),
      (minimapRect.height - pointerRect.height) /
        (RAW_IMAGE_HEIGHT),
    ]);
    setAxis({
      rawX: {
        range: [0, RAW_IMAGE_WIDTH - viewRect.width],
      },
      rawY: {
        range: [0, RAW_IMAGE_HEIGHT - viewHeight],
      },
    });
  }, []);

  return (
    <div>
      <p>You can create a scrollable minimap using two axes.</p>
      <div style={{ position: "relative" }}>
        <div id="imageView" style={{ height: `${viewHeight}px` }}>
          <div id="rawImage" style={{ transform: `translate3d(${-rawX}px, ${-rawY}px, 0)` }}></div>
        </div>
        <div id="minimap">
          <div id="minimap-pointer"
            style={{
              width: `${pointerWidth}px`,
              height: `${pointerWidth * IMAGE_RATE}px`,
              transform: `translate3d(${rawX * scale[0]}px, ${ rawY * scale[1] }px, 0)`,
            }}></div>
        </div>
      </div>
    </div>
  );
};

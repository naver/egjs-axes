import React, { useEffect } from "react";

import Axes, { PanInput, MoveKeyInput } from "../../../../src/index";
import "../../css/demos/minimap.css";

const Minimap = () => {
  useEffect(() => {
    // raw-image 1280 * 1677
    const RAW_IMAGE_WIDTH = 1280;
    const RAW_IMAGE_HEIGHT = 1677;
    // mini-map 128 * 167.7
    const MINIMAP_WIDTH = 128;
    const IMAGE_RATE = RAW_IMAGE_HEIGHT / RAW_IMAGE_WIDTH;

    const painting = document.getElementById("rawImage");
    const view = document.getElementById("imageView");
    const viewWidth = view.getBoundingClientRect().width;
    view.style.height = viewWidth * IMAGE_RATE + "px";
    const viewRect = view.getBoundingClientRect();
    const minimap = document.getElementById("minimap"); // 1/10
    const minimapRect = minimap.getBoundingClientRect();
    const pointer = document.getElementById("minimap-pointer");
    const pointerWidth = (viewWidth / RAW_IMAGE_WIDTH) * MINIMAP_WIDTH;
    pointer.style.width = pointerWidth + "px";
    pointer.style.height = pointerWidth * IMAGE_RATE + "px";
    const pointerRect = pointer.getBoundingClientRect();
    const scale = [
      (minimapRect.width - pointerRect.width) /
        (RAW_IMAGE_WIDTH - viewRect.width),
      (minimapRect.height - pointerRect.height) /
        (RAW_IMAGE_HEIGHT - viewRect.height),
    ];

    // 1. Initialize eg.Axes
    const axes = new Axes(
      {
        rawX: {
          range: [0, RAW_IMAGE_WIDTH - viewRect.width],
          bounce: 100,
        },
        rawY: {
          range: [0, RAW_IMAGE_HEIGHT - viewRect.height],
          bounce: 100,
        },
      },
      {
        deceleration: 0.0024,
      }
    );

    // 2. attach event handler
    axes.on("change", ({ pos }) => {
      painting.style[
        Axes.TRANSFORM
      ] = `translate3d(${-pos.rawX}px, ${-pos.rawY}px, 0)`;
      pointer.style[Axes.TRANSFORM] = `translate3d(${pos.rawX * scale[0]}px, ${
        pos.rawY * scale[1]
      }px, 0)`;
    });

    // 3. Initialize a inputType and connect it
    axes
      .connect(
        "rawX rawY",
        new PanInput(view, {
          scale: [-1, -1],
        })
      )
      .connect("rawX rawY", new MoveKeyInput(view, { scale: [10, -10] }));
  }, []);

  return (
    <div className="demobox">
      <p>You can create a scrollable minimap using two axes.</p>
      <div style={{ position: "relative" }}>
        <div id="imageView">
          <div id="rawImage"></div>
        </div>
        <div id="minimap">
          <div id="minimap-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default Minimap;

import React, { useEffect } from "react";

import Axes, { PanInput } from "../../../../src/index";
import "../../css/demos/car360viewer.css";

const Car360viewer = () => {
  useEffect(() => {
    const images = Array.prototype.slice.call(
      document.querySelectorAll(".car_rotate img")
    );
    const imagesNum = images.length;
    const ape = 360 / imagesNum; // angle per each

    // 1. Initialize eg.Axes
    const axes = new Axes(
      {
        angle: {
          range: [0, 360],
          circular: true,
        },
      },
      {
        deceleration: 0.01,
      }
    );

    // 2. attach event handler
    axes.on("change", ({ pos }) => {
      const index = Math.min(
        Math.round((pos.angle % 360) / ape),
        imagesNum - 1
      );
      images.map((v, i) => {
        v.style.display = i === index ? "inline-block" : "none";
      });
    });

    // 3. Initialize a inputType and connect it
    axes.connect("angle", new PanInput(".car_rotate"));
  }, []);

  return (
    <div>
      <p>
        You can create a viewer that can rotate 360 ​​degrees using one axis.
      </p>
      <div className="car_spot">
        <div className="car_rotate">
          <div
            className="img_cont"
            style={{ position: "relative", zIndex: 10 }}
          >
            <img
              src={
                require("@site/static/img/demos/car360/beatle (1).png").default
              }
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (2).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (3).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (4).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (5).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (6).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (7).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (8).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (9).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (10).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (11).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (12).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (13).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (14).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (15).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (16).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (17).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (18).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (19).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (20).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (21).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (22).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (23).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (24).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (25).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (26).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (27).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (28).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (29).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (30).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (31).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (32).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (33).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (34).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (35).png").default
              }
              style={{ display: "none" }}
            />
            <img
              src={
                require("@site/static/img/demos/car360/beatle (36).png").default
              }
              style={{ display: "none" }}
            />
          </div>
          <div className="ratate_bg"></div>
        </div>
      </div>
    </div>
  );
};

export default Car360viewer;

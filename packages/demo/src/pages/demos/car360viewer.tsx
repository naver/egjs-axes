import React, { useEffect } from "react";

import { useAxes, PanInput } from "@egjs/react-axes";
import "../../css/demos/car360viewer.css";

const Car360viewer = () => {
  const images = Array.from({length: 36}, (_, i) => i + 1);
  const { connect, angle } = useAxes(
    {
      angle: {
        range: [0, 360],
        circular: true,
      }
    },
    {
      deceleration: 0.01,
    },
  );

  useEffect(() => {
    connect("angle", new PanInput(".car_rotate"));
  }, []);

  return (
    <div>
      <p>You can create a viewer that can rotate 360 ​​degrees using one axis.</p>
      <div className="car_spot">
        <div className="car_rotate">
          <div className="img_cont" style={{ position: "relative", zIndex: 10 }}>
            {images.map((i) => (
              <img
                key={i}
                src={ require(`@site/static/img/demos/car360/beatle (${i}).png`).default}
                style={{ display: Math.floor((angle % 360) / 10 + 1) === i ? "inline-block" : "none" }}
              />
            ))}
          </div>
          <div className="ratate_bg"></div>
        </div>
      </div>
    </div>
  );
};

export default Car360viewer;

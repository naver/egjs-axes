import React, { useEffect, useState } from "react";

import { useAxes, RotatePanInput } from "@egjs/react-axes";
import "../../css/demos/schedule.css";

type DurationType = "slow" | "average" | "fast";

const durationMap: Record<DurationType, number> = {
  fast: 1000,
  average: 3000,
  slow: 10000,
};

const Schedule = () => {
  const [animationTime, setAnimationTime] = useState(3000);
  const [durationType, setDurationType] = useState<DurationType>("average");
  const [isRotateEnabled, setIsRotateEnabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { connect, disconnect, setTo, updateAnimation, setOptions, onAnimationStart, onChange, onFinish, angle } = useAxes(
    {
      angle: {
        range: [0, 360],
        circular: true,
      },
    },
    {
      minimumDuration: 3000,
      maximumDuration: 3000,
    },
  );

  onAnimationStart(() => {
    setIsUpdating(true);
  });

  onChange(() => {
    const point = document.getElementById("point");
    point.style.transform = `translateX(${Math.random() * 3}px)`;
    point.style.transform = `translateY(${Math.random() * 3}px)`;
  });

  onFinish(() => {
    setIsUpdating(false);
  });

  useEffect(() => {
    setTo({ angle: 210 });
  }, []);

  const toggleConnect = (isRotate: boolean) => {
    if (isRotate) {
      const input = new RotatePanInput("#clock");
      connect("angle", input);
    } else {
      disconnect();
    }
  };

  const toggleCheckbox = () => {
    setIsRotateEnabled(!isRotateEnabled);
    toggleConnect(!isRotateEnabled);
  };

  const rotateTo = (pos: number) => {
    const nextpos = angle > pos ? pos : pos - 360;
    setTo({ angle: nextpos }, animationTime);
  };

  const updateTo = (pos: number) => {
    const nextpos = angle > pos ? pos : pos - 360;
    updateAnimation({ destPos: { angle: nextpos } });
  };

  const updateDuration = (durationType: DurationType) => {
    const duration = durationMap[durationType];
    setDurationType(durationType);
    setAnimationTime(duration);
    setOptions({
      minimumDuration: duration,
      maximumDuration: duration,
    });
    updateAnimation({ duration: animationTime, restart: true });
  };

  return (
    <div>
      <p>You can control animation while it is playing.</p>
      <h3 style={{ cursor: "pointer" }}>
        <input
          onChange={() => toggleCheckbox()}
          checked={isRotateEnabled}
          type="checkbox"
          id="rotatepan"
        />
        <label htmlFor="rotatepan">Enable RotatePanInput</label>
      </h3>

      <div className="clock-wrapper">
        <div className="options">
          <h3>Animation Speed</h3>

          <div className="btn-group">
            <button
              className={durationType === "slow" ? "slow active" : "slow"}
              onClick={() => {
                updateDuration("slow");
              }}
            >
              Slow (10s)
            </button>
            <button
              className={
                durationType === "average" ? "average active" : "average"
              }
              onClick={() => {
                updateDuration("average");
              }}
            >
              Average (3s)
            </button>
            <button
              className={durationType === "fast" ? "fast active" : "fast"}
              onClick={() => {
                updateDuration("fast");
              }}
            >
              Fast (1s)
            </button>
          </div>

          <h3>Run Animation</h3>

          <div className="btn-group set">
            <button
              onClick={() => {
                rotateTo(270);
              }}
            >
              6:00
            </button>
            <button
              onClick={() => {
                rotateTo(180);
              }}
            >
              12:00
            </button>
            <button
              onClick={() => {
                rotateTo(90);
              }}
            >
              18:00
            </button>
            <button
              onClick={() => {
                rotateTo(0);
              }}
            >
              24:00
            </button>
          </div>

          <h3>Update Animation</h3>

          <div
            className={
              isUpdating ? "btn-group update active" : "btn-group update"
            }
          >
            <button
              onClick={() => {
                updateTo(270);
              }}
            >
              6:00
            </button>
            <button
              onClick={() => {
                updateTo(180);
              }}
            >
              12:00
            </button>
            <button
              onClick={() => {
                updateTo(90);
              }}
            >
              18:00
            </button>
            <button
              onClick={() => {
                updateTo(0);
              }}
            >
              24:00
            </button>
          </div>
        </div>
        <div id="clock" className="axes-target">
          <div id="point">
            <img
              src={require("@site/static/img/demos/schedule/point.png").default}
              style={{ width: "50px" }}
            />
          </div>
          <div id="rotate" style={{ transform: `rotate(${angle}deg)` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

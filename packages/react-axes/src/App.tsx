import { createRef, useEffect } from "react";
import { PanInput, MoveKeyInput } from "./react-axes";
import { useAxes } from "./react-axes/useAxes";
import "./App.css";

function App() {
  const box = createRef<HTMLDivElement>();
  const container = createRef<HTMLDivElement>();
  const area = createRef<HTMLDivElement>();
  const axes = useAxes(
    {
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

  axes.onChange(({ pos }) => {
    if (box.current && container.current) {
      box.current.style[
        "transform"
      ] = `rotateY(${pos.rotateX}deg) rotateX(${pos.rotateY}deg)`;
    }
  }, []);

  useEffect(() => {
    axes
      .connect("rotateX rotateY", new PanInput(area))
      .connect("rotateX rotateY", new MoveKeyInput(area, { scale: [10, -10] }));
  }, []);

  return (
    <div className="App">
      <p>You can rotate the cube using two axes.</p>
      <div id="area" ref={area}>
        <div id="container" ref={container}>
          <div id="box" ref={box}>
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
}

export default App;

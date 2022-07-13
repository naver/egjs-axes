import { useRef } from "react";
import { PanInput, MoveKeyInput } from "./react-axes";
import { useAxes } from "./react-axes/useAxes";
import "./App.css";

function App() {
  const box = useRef<HTMLElement>(null) as any as ((
    e: HTMLElement | null
  ) => void) & { current: HTMLElement | null };
  const container = useRef<HTMLElement>(null) as any as ((
    e: HTMLElement | null
  ) => void) & { current: HTMLElement | null };
  const area = useRef<HTMLElement>(null) as any as ((
    e: HTMLElement | null
  ) => void) & { current: HTMLElement | null };
  const { rotateX, rotateY } = useAxes(
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
    },
    {
      rotateX: 0,
      rotateY: 0,
    },
    (axes) => {
      axes
        .connect("rotateX rotateY", new PanInput(area))
        .connect(
          "rotateX rotateY",
          new MoveKeyInput(area, { scale: [10, -10] })
        );
      axes.setTo(
        {
          rotateX: 40,
          rotateY: 315,
        },
        200
      );
    }
  );

  return (
    <div className="App">
      <p>
        You can rotate the cube using two axes.
      </p>
      <div id="area" ref={area}>
        <div id="container" ref={container}>
          <div
            id="box"
            ref={box}
            style={{
              transform:
                `rotateY(${rotateX}deg) rotateX(${rotateY}deg)`,
            }}
          >
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

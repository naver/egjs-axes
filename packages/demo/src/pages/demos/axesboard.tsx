import React, { useEffect, useRef } from "react";
import { useAxes, PanInput, MoveKeyInput, PinchInput, WheelInput } from "@egjs/react-axes";
import "../../css/demos/axesboard.css";

export default function AxesBoard({ axis, demoType, options, panInputOptions, pinchInputOptions, moveKeyInputOptions, wheelInputOptions }) {
  const board = useRef<HTMLDivElement>(null);
  const innerBoard = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const { connect, setAxis, setTo, x, y, zoom } = useAxes(
    {
      x: {
        range: [0, 100],
        startPos: 0,
        ...axis && axis.x,
      },
      y: {
        range: [0, 100],
        startPos: 0,
        ...axis && axis.y,
      },
      zoom: {
        range: [20, 100],
        startPos: 100,
        ...axis && axis.zoom,
      },
    },
    {
      round: 0.1,
      ...options,
      nested: !!(demoType === "nested"),
    },
  );

  const nested = useAxes(
    {
      innerX: {
        range: [0, 100],
        startPos: 0,
      },
      innerY: {
        range: [0, 100],
        startPos: 0,
      },
    },
    {
      round: 0.1,
    },
  );

  const onClick = () => {
    if (demoType === "preventClickOnDrag") {
      window.open("https://www.naver.com/");
    }
  };

  useEffect(() => {
    const isNested = options?.nested;
    const boardWidth = board.current.getBoundingClientRect().width;
    const boardHeight = board.current.getBoundingClientRect().height;
    const targetWidth = target.current.getBoundingClientRect().width;
    const targetHeight = target.current.getBoundingClientRect().height;
    const maxWidth = boardWidth - targetWidth;
    const maxHeight = boardHeight - targetHeight;
    const xRange = axis && axis.x && axis.x.range && axis.x.range[1];
    const yRange = axis && axis.y && axis.y.range && axis.y.range[1];
    if (isNested) {
      const innerBoardWidth = innerBoard.current.getBoundingClientRect().width;
      const innerBoardHeight = innerBoard.current.getBoundingClientRect().height;
      const innerMaxWidth = boardWidth - innerBoardWidth;
      const innerMaxHeight = boardHeight - innerBoardHeight;
      nested.setAxis({
        innerX: {
          range: [0, innerMaxWidth],
        },
        innerY: {
          range: [0, innerMaxHeight],
        },
      });
      nested.setTo({ innerX: (innerMaxWidth) / 2, innerY: (innerMaxHeight) / 2 });
      setAxis({
        x: {
          range: [0, innerBoardWidth - targetWidth],
        },
        y: {
          range: [0, innerBoardHeight - targetHeight],
        },
      });
      setTo({ x: (innerBoardWidth - targetWidth) / 2, y: (innerBoardHeight - targetHeight) / 2 });
      nested.connect(["innerX", "innerY"], new PanInput(board, panInputOptions));
      nested.connect(["innerX", "innerY"], new MoveKeyInput(board, {
        scale: [5, -5],
        ...moveKeyInputOptions,
      }));
    } else {
      setAxis({
        x: {
          range: [0, xRange ? xRange * maxWidth : maxWidth],
        },
        y: {
          range: [0, yRange ? yRange* maxHeight : maxHeight],
        },
      });
      if (!axis?.x?.startPos && !axis?.y?.startPos) {
        setTo({ x: (maxWidth) / 2, y: (maxHeight) / 2 });
      }
    }
    connect("zoom", new PinchInput(isNested ? innerBoard : board, {
      scale: 4,
      ...pinchInputOptions,
    }));
    if (wheelInputOptions) {
      connect(["y", "x"], new WheelInput(isNested ? innerBoard : board, {
        scale: 5,
        ...wheelInputOptions,
      }));
    }
    connect(["x", "y"], new MoveKeyInput(isNested ? innerBoard : board, {
      scale: [5, -5],
      ...moveKeyInputOptions,
    }));
    connect(panInputOptions?.thresholdAngle ? ["x", ""] : ["x", "y"], new PanInput(isNested ? innerBoard : board, panInputOptions));
  }, []);

  return options?.nested ? (
    <div className="board" ref={board}>
      <div className="info">x: {x} y: {y}</div>
      <div className="nestedboard" ref={innerBoard} style={{ transform: `translate3d(${nested.innerX}px, ${nested.innerY}px, 0)`}}>
        <div className="target" ref={target} style={{ transform: `translate3d(${x}px, ${y}px, 0) scale(${zoom / 100})`}}>
          <img
            draggable="false"
            className="egjsicon"
            src={
              require(`@site/static/img/favicon.ico`)
                .default
            }
            width="110"
          />
        </div>
      </div>
    </div>) : (
    <div className="board" ref={board}>
      <div className="info">x: {x} y: {y}</div>
      <div className="target" ref={target} style={{ transform: `translate3d(${x}px, ${y}px, 0) scale(${zoom / 100})` }} onClick={() => { onClick(); }}>
        <img
          draggable="false"
          className="egjsicon"
          src={
            require(`@site/static/img/favicon.ico`)
              .default
          }
          width="110"
        />
      </div>
    </div>
  );
};

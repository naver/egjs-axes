import React, { useEffect, useState, useRef } from "react";

import { useAxes, PanInput } from "@egjs/react-axes";
import "../../css/demos/pulltorefresh.css";

declare function require(path: string): any;

export default function PullToRefresh() {
  const [slides, setSlides] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [range, setRange] = useState(0);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const { connect, setAxis, setTo, onChange, onRelease, isBounceArea, scroll } = useAxes({
    scroll: {
      range: [0, 0],
      bounce: 120,
    },
  });

  const getMaxRange = (content: HTMLElement, contentWrapper: HTMLElement) => {
    return (
      content.getBoundingClientRect().height -
      contentWrapper.getBoundingClientRect().height
    );
  };

  onChange(({ pos }) => {
    const prepend = document.getElementById("prepend");
    const append = document.getElementById("append");
    if (isBounceArea()) {
      const info = getInfo(pos.scroll);
      if (info.isAdd) {
        if (info.isTop) {
          prepend.innerText = "Release to prepend";
        } else {
          append.innerText = "Release to append";
        }
      } else {
        if (info.isTop) {
          prepend.innerText = "Pull to prepend";
        } else {
          append.innerText = "Pull to append";
        }
      }
    }
  });

  onRelease(({ depaPos }) => {
    if (isBounceArea()) {
      const info = getInfo(depaPos.scroll);
      if (info.isAdd) {
        const newIndex = Math.floor(Math.random() * 50 + 1);
        if (info.isTop) {
          setSlides([newIndex, ...slides]);
          setTo({ scroll: 0 });
        } else {
          setSlides([...slides, newIndex]);
        }
        setAxis({
          scroll: {
            range: [0, getMaxRange(content.current, contentWrapper.current)],
          },
        });
      }
    }
  });

  const getInfo = (pos) => {
    const state = pos > 0 ? (pos - range) / 120 : -pos / 120;
    return {
      isAdd: state > 0.8,
      isTop: pos < 0,
    };
  };

  useEffect(() => {
    const maxRange = getMaxRange(content.current, contentWrapper.current);

    setRange(maxRange);
    setAxis({
      scroll: {
        range: [0, maxRange],
      },
    });
    connect(
      ["", "scroll"],
      new PanInput(contentWrapper, {
        scale: [0, -1],
      })
    );
  }, []);

  return (
    <div>
      <p>You can create a pull-to-refresh UI using one axis.</p>
      <div id="pull-contentWrapper" ref={contentWrapper}>
        <div id="prepend">Pull to prepend</div>
        <ul id="pull-content" style={{ transform: `translate3d(0, ${-scroll}px, 0)` }} ref={content}>
          {slides.map((img, i) => (
            <li className="pull_drw" key={i}>
              <div className="pull_im">
                <img src={ require(`@site/static/img/demos/pulltorefresh/${img}.jpg`).default} width="110" />
              </div>
              <div className="pull_tx">
                <span className="pull_tit">
                  egjs is Javascript components group that brings easiest and
                  fastest way to build a web application in your way
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div id="append">Pull to append</div>
      </div>
      <div className="bottomWapper"></div>
    </div>
  );
};

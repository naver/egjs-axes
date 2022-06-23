import React, { useEffect, useState } from "react";

import Axes, { PanInput } from "../../../../src/index";
import "../../css/demos/pulltorefresh.css";

declare function require(path: string): any;

const axes = new Axes({
  scroll: {
    range: [0, 0],
    bounce: 100,
  },
});

const getMaxRange = (content: HTMLElement, contentWrapper: HTMLElement) => {
  return (
    content.getBoundingClientRect().height -
    contentWrapper.getBoundingClientRect().height
  );
};

const getInfo = (pos) => {
  const state = pos > 0 ? (pos - axes.axis.scroll.range[1]) / 100 : -pos / 100;
  return {
    isAdd: state > 0.8,
    isTop: pos < 0,
  };
};

const PullToRefresh = () => {
  const [slides, setSlides] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    const contentWrapper = document.getElementById("pull-contentWrapper");
    const content = document.getElementById("pull-content");
    const prepend = document.getElementById("prepend");
    const append = document.getElementById("append");

    // 1. Initialize eg.Axes
    axes.axis.scroll.range = [0, getMaxRange(content, contentWrapper)];

    // 2. Initialize inputTypes and connect it
    axes.connect(
      ["", "scroll"],
      new PanInput(contentWrapper, {
        scale: [0, -1],
      })
    );

    // 3. attach change event handler
    axes.on({
      change: ({ pos }) => {
        content.style[Axes.TRANSFORM] = `translate3d(0, ${-pos.scroll}px, 0)`;
        if (axes.isBounceArea()) {
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
      },
    });
  }, []);

  useEffect(() => {
    const contentWrapper = document.getElementById("pull-contentWrapper");
    const content = document.getElementById("pull-content");

    // 4. attach release event handler on each slides update
    axes.off("release");
    axes.on({
      release: ({ depaPos }) => {
        if (axes.isBounceArea()) {
          const info = getInfo(depaPos.scroll);
          if (info.isAdd) {
            const newIndex = Math.floor(Math.random() * 50 + 1);
            if (info.isTop) {
              setSlides([newIndex, ...slides]);
            } else {
              setSlides([...slides, newIndex]);
            }
            axes.axis.scroll.range[1] = getMaxRange(content, contentWrapper);
          }
        }
      },
    });
  }, [slides]);

  return (
    <div className="demobox">
      <p>You can create a pull-to-refresh UI using one axis.</p>
      <div id="pull-contentWrapper">
        <div id="prepend">Pull to prepend</div>
        <ul id="pull-content">
          {slides.map((img, i) => (
            <li className="pull_drw" key={i}>
              <div className="pull_im">
                <img
                  src={
                    require(`@site/static/img/demos/pulltorefresh/${img}.jpg`)
                      .default
                  }
                  width="110"
                />
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

export default PullToRefresh;

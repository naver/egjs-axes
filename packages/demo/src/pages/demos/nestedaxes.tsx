import React, { useEffect } from "react";

import Axes, { PanInput, WheelInput } from "../../../../src/index";
import "../../css/demos/nestedaxes.css";

const NestedAxes = () => {
  const range = (v: number) => Array.from(Array(v).keys());
  const HEAD_COUNT = 3;
  const HEAD_SLIDES = range(HEAD_COUNT);
  const BODY_COUNT = 7;
  const BODY_LENGTH = 4;
  const BODY_LIST = range(BODY_LENGTH);
  const BODY_SLIDES = range(BODY_COUNT);
  const LEGS_COUNT = 3;
  const LEGS_SLIDES = range(LEGS_COUNT);
  let cloudLength = 0;

  useEffect(() => {
    const CLOUD_LIST = Array.from(Array(cloudLength).keys());
    const box = document.getElementById("catbox");
    const cat = document.getElementById("cat");
    const head = document.getElementById("head0");
    const body = BODY_LIST.map((index) => {
      return document.getElementById(`body${index}`);
    });
    const legs = document.getElementById("legs0");
    const cloud = CLOUD_LIST.map((index) => {
      return document.getElementById(`cloud${index}`);
    });

    // 1. Initialize eg.Axes
    const axesY = new Axes({
      y: {
        range: [
          0,
          cat.getBoundingClientRect().height -
            box.getBoundingClientRect().height +
            40,
        ],
        bounce: 30,
      },
    });

    const headWidth = head.scrollWidth - head.getBoundingClientRect().width;
    const headOffset = headWidth / (HEAD_COUNT - 1);
    const headX = new Axes({
      x: {
        range: [0, headWidth],
        bounce: 10,
      },
    });

    const bodyWidth =
      body[0].scrollWidth - body[0].getBoundingClientRect().width;
    const bodyOffset = bodyWidth / (BODY_COUNT - 1);
    const bodyX = BODY_LIST.map((index) => {
      return new Axes({
        x: {
          range: [
            0,
            body[index].scrollWidth - body[index].getBoundingClientRect().width,
          ],
          bounce: 10,
        },
      });
    });

    const legsWidth = legs.scrollWidth - legs.getBoundingClientRect().width;
    const legsOffset = legsWidth / (HEAD_COUNT - 1);
    const legsX = new Axes({
      x: {
        range: [0, legsWidth],
        bounce: 10,
      },
    });

    const cloudXY = CLOUD_LIST.map((index) => {
      return new Axes(
        {
          x: {
            range: [
              -(body[0].getBoundingClientRect().width / 5),
              body[0].getBoundingClientRect().width / 5,
            ],
            bounce: 0,
          },
          y: {
            range: [
              -(body[0].getBoundingClientRect().height / 5),
              body[0].getBoundingClientRect().height / 5,
            ],
            bounce: 0,
          },
        },
        {
          nested: true,
        }
      );
    });

    // 2. attach event handler
    axesY.on({
      change: ({ pos }) => {
        cat.style[Axes.TRANSFORM] = `translate3d(0, ${-pos.y}px, 0)`;
      },
    });

    headX.on({
      change: ({ pos }) => {
        head.style[Axes.TRANSFORM] = `translate3d(${-pos.x}px, 0, 0)`;
      },
    });
    headX.on({
      release: (e) => {
        const destPos = e.destPos;
        e.setTo({ x: Math.round(destPos.x / headOffset) * headOffset }, 200);
      },
    });

    bodyX.forEach((axes, index) => {
      axes.on({
        change: ({ pos }) => {
          body[index].style[Axes.TRANSFORM] = `translate3d(${-pos.x}px, 0, 0)`;
        },
      });
      axes.on({
        release: (e) => {
          const destPos = e.destPos;
          e.setTo({ x: Math.round(destPos.x / bodyOffset) * bodyOffset }, 200);
        },
      });
    });

    legsX.on({
      change: ({ pos }) => {
        legs.style[Axes.TRANSFORM] = `translate3d(${-pos.x}px, 0, 0)`;
      },
    });
    legsX.on({
      release: (e) => {
        const destPos = e.destPos;
        e.setTo({ x: Math.round(destPos.x / legsOffset) * legsOffset }, 200);
      },
    });

    cloudXY.forEach((axes, index) => {
      axes.on({
        change: ({ pos }) => {
          cloud[index].style[
            Axes.TRANSFORM
          ] = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        },
      });
    });

    // 3. Initialize inputTypes and connect it
    axesY.connect(
      ["", "y"],
      new PanInput(box, {
        scale: [0, -1],
      })
    );
    axesY.connect(
      "y",
      new WheelInput(box, {
        scale: -head.getBoundingClientRect().height,
      })
    );

    headX.connect(
      ["x", ""],
      new PanInput(head, {
        scale: [-1, 0],
      })
    );
    headX.setTo({
      x: headOffset,
    });

    bodyX.forEach((axes, index) => {
      axes.connect(
        ["x", ""],
        new PanInput(body[index], {
          scale: [-1, 0],
        })
      );
      axes.setTo({
        x: bodyOffset * 3,
      });
    });

    legsX.connect(
      ["x", ""],
      new PanInput(legs, {
        scale: [-1, 0],
      })
    );
    legsX.setTo({
      x: legsOffset,
    });

    cloudXY.forEach((axes, index) => {
      axes.connect(
        ["x", "y"],
        new PanInput(cloud[index], {
          scale: [1, 1],
        })
      );
      axes.setTo({
        x:
          (Math.random() - 0.5 > 0 ? 1 : -1) *
          Math.random() *
          (body[0].getBoundingClientRect().width / 5),
        y:
          (Math.random() - 0.5 > 0 ? 1 : -1) *
          Math.random() *
          (body[0].getBoundingClientRect().height / 5),
      });
    });
  }, []);

  return (
    <div>
      <p>You can place Axes in another Axes.</p>
      <div id="catbox" className="cat-wrapper">
        <div id="cat">
          <div id="head0" className="cat-head">
            {HEAD_SLIDES.map((slideIndex, i) => (
              <div className="cat-option" key={"head" + i}>
                <img
                  id={`cloud${cloudLength++}`}
                  className="cloud"
                  src={
                    require(`@site/static/img/demos/nestedaxes/cloud${
                      Math.floor(cloudLength % 3) + 1
                    }.png`).default
                  }
                />
                <img
                  src={
                    require(`@site/static/img/demos/nestedaxes/head${
                      slideIndex + 1
                    }.png`).default
                  }
                />
              </div>
            ))}
          </div>
          {BODY_LIST.map((index, i) => (
            <div id={`body${index}`} className="cat-body" key={"body" + i}>
              {BODY_SLIDES.map((slideIndex, j) => (
                <div className="cat-option" key={"body" + i + "slide" + j}>
                  <img
                    id={`cloud${cloudLength++}`}
                    className="cloud"
                    src={
                      require(`@site/static/img/demos/nestedaxes/cloud${
                        Math.floor(cloudLength % 3) + 1
                      }.png`).default
                    }
                  />
                  <img
                    id={`cloud${cloudLength++}`}
                    className="cloud"
                    src={
                      require(`@site/static/img/demos/nestedaxes/cloud${
                        Math.floor(cloudLength % 3) + 1
                      }.png`).default
                    }
                  />
                  <img
                    src={
                      require(`@site/static/img/demos/nestedaxes/body${
                        slideIndex + 1
                      }.png`).default
                    }
                  />
                </div>
              ))}
            </div>
          ))}
          <div id="legs0" className="cat-legs">
            {LEGS_SLIDES.map((slideIndex, i) => (
              <div className="cat-option" key={"legs" + i}>
                <img
                  id={`cloud${cloudLength++}`}
                  className="cloud"
                  src={
                    require(`@site/static/img/demos/nestedaxes/cloud${
                      Math.floor(cloudLength % 3) + 1
                    }.png`).default
                  }
                />
                <img
                  src={
                    require(`@site/static/img/demos/nestedaxes/legs${
                      slideIndex + 1
                    }.png`).default
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedAxes;

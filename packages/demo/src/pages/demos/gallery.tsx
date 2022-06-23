import React, { useEffect } from "react";

import Axes, { PanInput } from "../../../../src/index";
import "../../css/demos/gallery.css";

const Gallery = () => {
  useEffect(() => {
    const slides = document.getElementById("slides");
    const slidesWidth =
      slides.scrollWidth - slides.getBoundingClientRect().width;
    const slidesOffset = slidesWidth / 5;
    const nestedWrapper = document.getElementById("nested");
    const nestedUpperSlides = document.getElementById("nestedUpperSlides");
    const nestedBelowSlides = document.getElementById("nestedBelowSlides");
    const nestedSlidesWidth =
      nestedWrapper.getBoundingClientRect().width * 2 - 60;
    const nestedSlidesOffset = nestedSlidesWidth / 2;

    // 1. Initialize eg.Axes
    const axes = new Axes({
      x: {
        range: [0, slidesWidth],
        bounce: 20,
      },
    });
    const nestedUpperAxes = new Axes(
      {
        x: {
          range: [0, nestedSlidesWidth],
        },
      },
      {
        nested: true,
      }
    );
    const nestedBelowAxes = new Axes(
      {
        x: {
          range: [0, nestedSlidesWidth],
        },
      },
      {
        nested: true,
      }
    );

    // 2. attach event handler
    axes.on({
      change: ({ pos }) => {
        slides.style[Axes.TRANSFORM] = `translate3d(${-pos.x}px, 0, 0)`;
      },
      release: (e) => {
        const destPos = e.destPos;
        e.setTo(
          { x: Math.round(destPos.x / slidesOffset) * slidesOffset },
          200
        );
      },
    });
    nestedUpperAxes.on({
      change: ({ pos }) => {
        nestedUpperSlides.style[
          Axes.TRANSFORM
        ] = `translate3d(${-pos.x}px, 0, 0)`;
      },
      release: (e) => {
        const destPos = e.destPos;
        e.setTo(
          {
            x: Math.round(destPos.x / nestedSlidesOffset) * nestedSlidesOffset,
          },
          200
        );
      },
    });
    nestedBelowAxes.on({
      change: ({ pos }) => {
        nestedBelowSlides.style[
          Axes.TRANSFORM
        ] = `translate3d(${-pos.x}px, 0, 0)`;
      },
      release: (e) => {
        const destPos = e.destPos;
        e.setTo(
          {
            x: Math.round(destPos.x / nestedSlidesOffset) * nestedSlidesOffset,
          },
          200
        );
      },
    });

    // 3. Initialize inputTypes and connect it
    axes.connect(
      ["x"],
      new PanInput(slides, {
        scale: [-1, 0],
      })
    );
    nestedUpperAxes.connect(
      ["x"],
      new PanInput(nestedUpperSlides, {
        scale: [-1, 0],
      })
    );
    nestedBelowAxes.connect(
      ["x"],
      new PanInput(nestedBelowSlides, {
        scale: [-1, 0],
      })
    );
  }, []);

  return (
    <div>
      <p>You can place Axes in another Axes.</p>
      <div className="carousel">
        <div id="slides">
          <div className="slide">
            <img
              src={require(`@site/static/img/demos/gallery/bg1.jpg`).default}
            />
          </div>
          <div className="slide">
            <img
              src={require(`@site/static/img/demos/gallery/bg2.jpg`).default}
            />
          </div>
          <div id="nested" className="slide">
            <div id="nestedUpperSlides" className="nestedslides">
              <div className="inner">
                <img
                  src={
                    require(`@site/static/img/demos/gallery/bg3-1.jpg`).default
                  }
                />
              </div>
              <div className="inner">
                <img
                  src={
                    require(`@site/static/img/demos/gallery/bg3-2.jpg`).default
                  }
                />
              </div>
              <div className="inner">
                <img
                  src={
                    require(`@site/static/img/demos/gallery/bg3-3.jpg`).default
                  }
                />
              </div>
            </div>
            <div id="nestedBelowSlides" className="nestedslides">
              <div className="inner">
                <img
                  src={
                    require(`@site/static/img/demos/gallery/bg3-1.jpg`).default
                  }
                />
              </div>
              <div className="inner">
                <img
                  src={
                    require(`@site/static/img/demos/gallery/bg3-2.jpg`).default
                  }
                />
              </div>
              <div className="inner">
                <img
                  src={
                    require(`@site/static/img/demos/gallery/bg3-3.jpg`).default
                  }
                />
              </div>
            </div>
          </div>
          <div className="slide">
            <img
              src={require(`@site/static/img/demos/gallery/bg4.jpg`).default}
            />
          </div>
          <div className="slide">
            <img
              src={require(`@site/static/img/demos/gallery/bg5.jpg`).default}
            />
          </div>
          <div className="slide">
            <img
              src={require(`@site/static/img/demos/gallery/bg6.jpg`).default}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

import React, { useEffect } from "react";

import Axes, { PanInput, WheelInput } from "../../../../src/index";
import "../../css/demos/3dcarousel.css";

const Carousel = () => {
  useEffect(() => {
    var carousel = document.getElementById("carousel");
    var COUNT = 8;
    var ANGLE = 360 / COUNT;

    // 1. Initialize eg.Axes
    var axes = new Axes({
      rotate: {
        range: [0, 360],
        circular: true,
      },
    });

    // 2. attach event handler
    axes.on({
      change: function (e) {
        var pos = e.pos;

        carousel.style[Axes.TRANSFORM] =
          "translateZ(-253px) rotateY(" + pos.rotate + "deg)";
      },
      release: function (e) {
        var destPos = e.destPos;

        e.setTo({ rotate: Math.round(destPos.rotate / ANGLE) * ANGLE }, 500);
      },
    });

    // 3. Initialize a inputType and connect it
    axes
      .connect("rotate", new PanInput("#carouselWrapper"))
      .connect(
        "rotate",
        new WheelInput("#carouselWrapper", { useNormalized: false })
      );
  }, []);

  return (
    <div className="demobox">
      <p>You can create a carousel by controlling the animation.</p>
      <div id="carouselWrapper">
        <div className="list_container">
          <div id="carousel" style={{ transform: "translateZ(-253px)" }}>
            <figure style={{ transform: "rotateY(0deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music1-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">Too Much</div>
              <div id="list_cd_artist">Loco</div>
            </figure>
            <figure style={{ transform: "rotateY(45deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music2-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">Woo ah</div>
              <div id="list_cd_artist">Crush</div>
            </figure>
            <figure style={{ transform: "rotateY(90deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music3-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">Man In The Mirror</div>
              <div id="list_cd_artist">Micheal Jackson</div>
            </figure>
            <figure style={{ transform: "rotateY(135deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music4-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">Adult</div>
              <div id="list_cd_artist">GiriBoy</div>
            </figure>
            <figure style={{ transform: "rotateY(180deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music5-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">Always Awake</div>
              <div id="list_cd_artist">Beenzino</div>
            </figure>
            <figure style={{ transform: "rotateY(225deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music6-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">City Burns</div>
              <div id="list_cd_artist">Andra Day</div>
            </figure>
            <figure style={{ transform: "rotateY(270deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music7-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">Get Some Air</div>
              <div id="list_cd_artist">Gary</div>
            </figure>
            <figure style={{ transform: "rotateY(315deg) translateZ(253px)" }}>
              <div
                id="list_cd"
                style={{
                  backgroundImage: `url(${
                    require("@site/static/img/demos/3dcarousel/music8-min.jpg")
                      .default
                  }`,
                }}
              >
                <div id="list_cd_hole"></div>
              </div>
              <div id="list_cd_title">Hold Me Tight</div>
              <div id="list_cd_artist">Loco</div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

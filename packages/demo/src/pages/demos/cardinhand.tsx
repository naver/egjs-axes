import React, { useEffect } from "react";

import Axes, { PanInput } from "../../../../axes/src/index";
import Icon from "../../../static/img/demos/logo_mono.svg";
import "../../css/demos/cardinhand.css";

const CardInHand = () => {
  useEffect(() => {
    const transform = Axes.TRANSFORM;
    const dot = document.getElementById("dot");
    const hand = document.querySelector(".hand");
    const cards = Array.prototype.slice.apply(
      document.querySelectorAll(".handcard")
    );
    const HAND_RADIUS = parseInt(window.getComputedStyle(hand).width) / 2;
    const CARD_OFFSET = -300;
    let handRotMin = null;
    let handRotMax = null;

    const getCardDistance = (card, hand) => {
      const handRect = hand.getBoundingClientRect();
      const handCenterY = (handRect.top + handRect.bottom) / 2;
      const handCenterX = (handRect.left + handRect.right) / 2;
      const cardRect = card.getBoundingClientRect();
      const cardCenterY = (cardRect.top + cardRect.bottom) / 2;
      const cardCenterX = (cardRect.left + cardRect.right) / 2;
      const deltaX = handCenterX - cardCenterX;
      const deltaY = handCenterY - cardCenterY;
      const cardDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      const cardTilt = ((Math.atan(deltaX / deltaY) * -1) / Math.PI) * 180;
      return {
        distance: cardDistance,
        tilt: cardTilt,
      };
    };

    const setCardOnHand = (card) => {
      const distance = getCardDistance(card, hand);
      const cardTilt = distance.tilt;
      const cardDistance = distance.distance;
      const cardOffset = cardDistance - CARD_OFFSET - HAND_RADIUS;

      if (handRotMin === null) {
        handRotMin = cardTilt;
      } else if (cardTilt < handRotMin) {
        handRotMin = cardTilt;
      }
      if (handRotMax === null) {
        handRotMax = cardTilt;
      } else if (cardTilt > handRotMax) {
        handRotMax = cardTilt;
      }
      card.style[
        Axes.TRANSFORM
      ] = `rotateZ(${cardTilt}deg) translateY(${cardOffset}px)`;
      card.setAttribute("data-cardOffset", cardOffset);
    };

    cards.forEach((v) => {
      setCardOnHand(v);
    });

    // 1. Initialize eg.Axes
    const axes = new Axes(
      {
        hand: {
          range: [handRotMin, handRotMax],
          bounce: 15,
        },
        top: {
          range: [0, 0],
          bounce: [100, 160],
        },
      },
      {
        deceleration: 0.00034,
      }
    );

    // 2. attach event handler
    axes.on("change", ({ pos }) => {
      dot.style["bottom"] = `${-1.4 * pos.top}px`;
      dot.style[transform] = `translateX(${pos.hand * 2.3}px)`;
      hand.style[transform] = `rotateZ(${pos.hand}deg)`;
      cards.forEach((v) => {
        v.style[transform] = `${
          v.style[transform].split("translateY")[0]
        } translateY(${
          parseFloat(v.getAttribute("data-cardOffset")) + pos.top
        }px)`;
      });
    });

    // 3. Initialize a inputType and connect it
    axes.connect(
      "hand top",
      new PanInput(hand, {
        scale: [0.3, 0.8],
      })
    );
  }, []);

  return (
    <div>
      <p>You can create a UI that responds to user input using two axes.</p>
      <div id="showcase">
        <div className="showcase-item">
          <div className="showcase-content">
            <div id="movableCoordWrapper">
              <div className="hand">
                <div className="handcard">
                  <Icon />
                </div>
                <div className="handcard">
                  <Icon />
                </div>
                <div className="handcard">
                  <Icon />
                </div>
                <div className="handcard">
                  <Icon />
                </div>
                <div className="handcard">
                  <Icon />
                </div>
                <div className="handcard">
                  <Icon />
                </div>
                <div className="handcard">
                  <Icon />
                </div>
              </div>
            </div>
            <div id="dot" className="movableDot"></div>
          </div>
        </div>
        <div className="codepen"></div>
      </div>
    </div>
  );
};

export default CardInHand;

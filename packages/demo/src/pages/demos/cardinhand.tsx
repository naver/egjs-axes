import React, { useState, useEffect, useRef } from "react";
import { useAxes, PanInput } from "@egjs/react-axes";
import Icon from "../../../static/img/demos/logo_mono.svg";
import "../../css/demos/cardinhand.css";

export default function CardInHand() {
  const CARD_OFFSET = -300;
  const [cards, setCards] = useState(new Array(7).fill({ tilt: 0, offset: 0 }));
  const { connect, setAxis, hand, top } = useAxes(
    {
      hand: {
        range: [0, 0],
        bounce: 15,
      },
      top: {
        range: [0, 0],
        bounce: [100, 160],
      },
    },
    {
      deceleration: 0.00034,
    },
  );

  useEffect(() => {
    const hand = document.querySelector(".hand");
    const handcards = Array.prototype.slice.apply(
      document.querySelectorAll(".handcard")
    );
    const HAND_RADIUS = parseInt(window.getComputedStyle(hand).width) / 2;
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

    const getCards = (card) => {
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
      return { tilt: cardTilt, offset: cardOffset };
    };

    setCards(handcards.map(card => getCards(card)));
    setAxis({
      hand: {
        range: [handRotMin, handRotMax],
      },
    });

    connect("hand top", new PanInput(".hand", { scale: [0.3, 0.8] }));
  }, []);

  return (
    <div>
      <p>You can create a UI that responds to user input using two axes.</p>
      <div id="showcase">
        <div className="showcase-item">
          <div className="showcase-content">
            <div id="movableCoordWrapper">
              <div className="hand" style={{ transform: `rotateZ(${hand}deg)` }}>
                {cards.map((card, i) => (
                  <div className="handcard" key={i} style={{ transform: `rotateZ(${card.tilt}deg) translateY(${card.offset + top}px)` }}><Icon /></div>
                ))}
              </div>
            </div>
            <div id="dot" className="movableDot" style={{ bottom: `${-1.4 * top}px`, transform: `translateX(${hand * 2.3}px)` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

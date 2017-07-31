$(function () {
  const movableDot = document.getElementById("dot");
  const hand = document.querySelector(".hand");
  const cards = [].slice.apply(document.querySelectorAll(".handcard"));
  const handRect = hand.getBoundingClientRect();
  const handCenterY = (handRect.top + handRect.bottom) / 2;
  const handCenterX = (handRect.left + handRect.right) / 2
  const HAND_RADIUS = parseInt(window.getComputedStyle(hand).width) / 2;
  const CARD_OFFSET = -300;
  let handRotMin = null;
  let handRotMax = null;

  cards.forEach(function (v) {
    setCardOnHand(v);
  });

  function getCardDistance(card, hand) {
    const handRect = hand.getBoundingClientRect();
    const handCenterY = (handRect.top + handRect.bottom) / 2;
    const handCenterX = (handRect.left + handRect.right) / 2
    const cardRect = card.getBoundingClientRect();
    const cardCenterY = (cardRect.top + cardRect.bottom) / 2;
    const cardCenterX = (cardRect.left + cardRect.right) / 2;
    const deltaX = handCenterX - cardCenterX;
    const deltaY = handCenterY - cardCenterY;
    const cardDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    const cardTilt = radToDeg(Math.atan(deltaX / deltaY) * -1);
    return {
      distance: cardDistance,
      tilt: cardTilt
    };
  }

  function radToDeg(rad) {
    return rad / Math.PI * 180;
  }

  function setCardOnHand(card) {
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
    card.style[eg.Axes.TRANSFORM] =
      `rotateZ(${cardTilt}deg) translateY(${cardOffset}px)`;
    card.setAttribute("data-cardOffset", cardOffset);
  }
  const transform = eg.Axes.TRANSFORM;
  const axes = new eg.Axes({
    axis: {
      hand: {
        range: [handRotMin, handRotMax],
        bounce: 15
      },
      top: {
        range: [0, 0],
        bounce: [40, 160]
      },
    },
    deceleration: 0.00034
  }).on("change", ({pos}) => {
    let cardDistance;
    let cardOffset;
    let currentRotateZ;
    movableDot.style["bottom"] = `${-1.4 * pos.top}px`;
    movableDot.style[transform] = `translateX(${pos.hand * 2.3}px)`;
    hand.style[transform] = `rotateZ(${pos.hand}deg)`;
    cards.forEach((v) => {
      cardDistance = getCardDistance(v, hand).distance;
      cardOffset = pos.top;
      currentRotateZ = v.style[transform].split("translateY")[0];
      v.style[transform] =
        `${currentRotateZ} translateY(${parseFloat(v.getAttribute("data-cardOffset")) + pos.top}px)`;
    });
  }).connect("hand top", new eg.Axes.PanInput(hand, {
    scale: [0.3, 0.8]
  })).setTo({
    hand: (handRotMin + handRotMax) / 2
  });
});

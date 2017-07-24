(function () {
	var movableDot = document.getElementById("dot");
	var hand = document.querySelector(".hand");
	var cards = [].slice.apply(document.querySelectorAll(".handcard"));
	var handRect = hand.getBoundingClientRect();
	var handCenterY = (handRect.top + handRect.bottom) / 2;
	var handCenterX = (handRect.left + handRect.right) / 2
	var HAND_RADIUS = parseInt(window.getComputedStyle(hand).width) / 2;
	var CARD_OFFSET = -300;
	var handRotMin = null;
	var handRotMax = null;

	cards.forEach(function (v) {
		setCardOnHand(v);
	});

	function getCardDistance(card, hand) {
		var handRect = hand.getBoundingClientRect();
		var handCenterY = (handRect.top + handRect.bottom) / 2;
		var handCenterX = (handRect.left + handRect.right) / 2
		var cardRect = card.getBoundingClientRect();
		var cardCenterY = (cardRect.top + cardRect.bottom) / 2;
		var cardCenterX = (cardRect.left + cardRect.right) / 2;
		var deltaX = handCenterX - cardCenterX;
		var deltaY = handCenterY - cardCenterY;
		var cardDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
		var cardTilt = radToDeg(Math.atan(deltaX / deltaY) * -1);
		return {
			distance: cardDistance,
			tilt: cardTilt
		};
	}

	function radToDeg(rad) {
		return rad / Math.PI * 180;
	}

	function setCardOnHand(card) {
		var distance = getCardDistance(card, hand);

		var cardTilt = distance.tilt;
		var cardDistance = distance.distance;

		var cardOffset = cardDistance - CARD_OFFSET - HAND_RADIUS;

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
		card.style[eg.Axes.TRANSFORM] = "rotateZ(" + cardTilt + "deg) translateY(" +
			cardOffset + "px)";
		card.setAttribute("data-cardOffset", cardOffset);
	}
	var transform = eg.Axes.TRANSFORM;
	var axes = new eg.Axes({
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
	}).on({
		"change": function (evt) {
			var cardDistance;
			var cardOffset;
			var currentRotateZ;
			var pos = evt.pos;

			movableDot.style["bottom"] = -1.4 * pos.top + "px";
			movableDot.style[transform] = "translateX(" + (pos.hand * 2.3) + "px)";
			hand.style[transform] = "rotateZ(" + pos.hand + "deg)";
			cards.forEach(function (v) {
				cardDistance = getCardDistance(v, hand).distance;
				cardOffset = pos.top;
				currentRotateZ = v.style[transform].split("translateY")[0];
				v.style[transform] = currentRotateZ +
					"translateY(" + (parseFloat(v.getAttribute("data-cardOffset")) +
						pos.top) + "px)";
			});
		}
	}).connect(["hand", "top"], new eg.Axes.PanInput(hand, {
		scale: [0.3, 0.8]
	})).setTo({
		hand: (handRotMin + handRotMax) / 2
	});
})();

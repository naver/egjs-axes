$(function () {
  const contentWrapper = document.getElementById("pull-contentWrapper");
  const content = document.getElementById("pull-content");
	const prepend = document.getElementById("prepend");
	const append = document.getElementById("append");

	function getInfo(pos) {
		const state = pos > 0 ? (pos - axes.axis.scroll.range[1])/100 : -pos/100;
		return {
			isAdd: state > 0.8,
			isTop: pos < 0,
		}

	}

	const axes = new eg.Axes({
		scroll: {
			range: [0, content.getBoundingClientRect().height - contentWrapper.getBoundingClientRect().height],
			bounce: 100
		}
	}).on({
    "change": event => {
      const y = event.pos.scroll;
			content.style[eg.Axes.TRANSFORM] = `translate3d(0, ${-y}px, 0)`;
			
			if (axes.isBounceArea()) {
				const info = getInfo(y);
				if (info.isAdd) {
					info.isTop ? (prepend.innerText = "Release to prepend") :
						(append.innerText = "Release to append");
				} else {
					info.isTop ? (prepend.innerText = "Pull to prepend") :
						(append.innerText = "Pull to append");
				}
			}
    },
    "release" : event => {
			const y = event.depaPos.scroll;
			if (axes.isBounceArea()) {
				const info = getInfo(y);
				if (info.isAdd > 0) {
					// content.inn.prependHTML([
	// 				'<li>prepend #1</li>',
	// 				'<li>prepend #2</li>',
	// 				'<li>prepend #3</li>',
	// 				'<li>prepend #4</li>',
	// 				'<li>prepend #5</li>'
	// 			].join(''));


				}
			}
    }
  });
  axes.connect(["", "scroll"], new eg.Axes.PanInput(contentWrapper, {
		scale : [ 0, -1 ]
	}));
  

	// var type = 0;

	// var body = jindo.$('wrap');
	// var bgColor = jindo.m.Effect.linear('#aaa', '#c77');

	// var fromTo = function(from, to) {
	// 	return function(v) {
	// 		return Math.max(0, Math.min(1, (v - from) / (to - from)));
	// 	};
	// };

	// var state = -1;

	// inst.attach({

	// 	'change' : function(oCustomEvent) {

	// 		var pos = oCustomEvent.aPos[1];

	// 		welContent.css({
	// 			'webkitTransform' : 'translate3d(0,' + (-pos) + 'px,0)'
	// 		});

	// 		var top = -oCustomEvent.aPos[1];
	// 		var bottom = -top - this.option('aMax')[1];

	// 		var currentState = 0;

	// 		if (top > 0) { currentState = top / -100; }
	// 		else if (bottom > 0) { currentState = bottom / 100; }

	// 		if (state === currentState) { return; }
	// 		state = currentState;

	// 		var absState = Math.abs(state);

	// 		if (absState > 0.8) {
	// 			body.style.backgroundColor = '#f88';
	// 			prepend.innerText = 'Release to prepend';
	// 			append.innerText = 'Release to append';
	// 		} else {
	// 			body.style.backgroundColor = bgColor(fromTo(0.5, 0.8)(absState));
	// 			prepend.innerText = 'Pull to prepend';
	// 			append.innerText = 'Pull to append';
	// 		}

	// 		prepend.style.opacity =
	// 		append.style.opacity = fromTo(0.5, 0.8)(absState);

	// 	},

	// 	'release' : function(oCustomEvent) {

	// 		var beforeHeight, incrHeight;

	// 		if (state < -0.8) {

	// 			beforeHeight = welContent.$value().clientHeight;

	// 			welContent.prependHTML([
	// 				'<li>prepend #1</li>',
	// 				'<li>prepend #2</li>',
	// 				'<li>prepend #3</li>',
	// 				'<li>prepend #4</li>',
	// 				'<li>prepend #5</li>'
	// 			].join(''));

	// 			inst.option('aMax', [ 0, welContent.$value().clientHeight - wrap.offsetHeight ]);

	// 			incrHeight = welContent.$value().clientHeight - beforeHeight;
	// 			inst.setBy(0, incrHeight);

	// 		} else if (state > 0.8) {

	// 			beforeHeight = welContent.$value().clientHeight;

	// 			welContent.appendHTML([
	// 				'<li>append #1</li>',
	// 				'<li>append #2</li>',
	// 				'<li>append #3</li>',
	// 				'<li>append #4</li>',
	// 				'<li>append #5</li>'
	// 			].join(''));

	// 			inst.option('aMax', [ 0, welContent.$value().clientHeight - wrap.offsetHeight ]);

	// 			incrHeight = welContent.$value().clientHeight - beforeHeight;
	// 			oCustomEvent.aDestPos[1] += incrHeight;

	// 		}

	// 	}

	// }).bind(document, {
	// 	nDirection : 4,
	// 	aScale : [ 1, -1 ]
	// });

});

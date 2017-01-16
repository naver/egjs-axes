var listEl = document.getElementById('lists');
var inst = new eg.MovableCoord({
		min : [ 0, 0 ],
		max : [ 1200, 100 ],
		bounce : [ 0, 100, 0, 100 ]
	}).on({
		'change' : function(evt) {
			var pos = evt.pos;

			var base = pos[0] / 300;
			var idx = Math.ceil(base);
			var list = listEl.querySelectorAll('li');
			var len = list.length;

			if (idx >= len) {
                listEl.style[TRANSFORM] = 'translate3d(' + (pos[0] - this.options.max[0]) + 'px,0,0)';
			} else {
				listEl.style[TRANSFORM] = 'translate3d(0,0,0)';
			}

			if (list[idx-1]) { 
                list[idx-1].style[TRANSFORM] = 'translate3d(0,0,0)'; 
            }
			if (list[idx]) { 
                list[idx].style[TRANSFORM] = 'translate3d(' + ((base-idx)*300) + 'px,0,0)';
            }
			if (list[idx+1]) { 
                list[idx+1].style[TRANSFORM] ='translate3d(-300px,0,0)';
            }
		},
		'release' : function(evt) {
			var pos = evt.destPos;
			pos[0] = Math.round(pos[0] / 300) * 300;
		}

	}).bind('#area', {
		scale : [ 1, .2 ],
		direction : eg.MovableCoord.DIRECTION_ALL
	});

inst.setTo(1200, 100,0);
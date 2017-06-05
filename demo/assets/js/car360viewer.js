(function(){
	new eg.MovableCoord({
		min: [0, 0],
		max: [720, 0],
		bounce: [0, 0, 0, 0],
		circular: [false, true, false, true],
	}).on({
		"change": function(e) {
			var $images = jQuery(".car_rotate img");
			var imagesNum = $images.length;
			var ape = 360 / imagesNum; // angle per each
			var index = Math.min(Math.round(e.pos[0] % 360 / ape), imagesNum - 1);

			$images.hide().eq(index).show();
		}
	}).bind(jQuery(".car_rotate").get(0));
})();

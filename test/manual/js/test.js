/**
 * Copyright (c) NAVER Corp.
 */

$(function() {
	var html = [];
	// make list
	for(var i=0; i<200; i++) {
		html.push("<li class='list check_visible'>#");
		html.push(i+1);
		html.push("</li>");
	}
	$("#content").html(html.join(""));
	var visibleView = new eg.Visible(document,{
		targetClass : "check_visible",
		expandSize : 0
	}).on("change", function(e) {
		// process visible elements
		$(e.visible).addClass("visible");
		// process invisible elements
		$(e.invisible).removeClass("visible");
	});
	// bind scroll event
	$(window).scroll(function() {
		visibleView.check(200);
	});
	if(window.IScroll) {
		var visible = new eg.Visible("#view",{
			targetClass : "check_visible",
			expandSize : 0
		}).on("change", function(e) {
			// process visible elements
			$(e.visible).addClass("visible");
			// process invisible elements
			$(e.invisible).removeClass("visible");
		});
		try {
			// using iscroll
			new IScroll("#view").on("scrollEnd", function(e) {
				visible.check(200);
			});
		} catch(e) {
			//console.log(e);
		}
		// init check
		visible.check();
	}
	visibleView.check();
});

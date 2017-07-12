declare var jQuery: any;

export function $(param, multi = false) {
	let el;

	if (typeof param === "string") {	// String (HTML, Selector)
		// check if string is HTML tag format
		const match = param.match(/^<([a-z]+)\s*([^>]*)>/);

		// creating element
		if (match) {	 // HTML
			const dummy = document.createElement("div");

			dummy.innerHTML = param;
			el = Array.prototype.slice.call(dummy.childNodes);
		} else {	// Selector
			el = Array.prototype.slice.call(document.querySelectorAll(param));
		}
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	} else if (param.nodeName &&
	(param.nodeType === 1 || param.nodeType === 9)) {	// HTMLElement, Document
		el = param;
	} else if (("jQuery" in window && param instanceof jQuery) ||
		param.constructor.prototype.jquery) {	// jQuery
		el = multi ? param.toArray() : param.get(0);
	}
	return el;
}

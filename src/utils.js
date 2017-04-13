import {window, document} from "./browser";

function $(param, multi = false) {
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
	} else if (param.nodeName && param.nodeType === 1) {	// HTMLElement
		el = param;
	} else if (window.jQuery && (param instanceof jQuery)) {	// jQuery
		el = multi ? param.toArray() : param.get(0);
	}

	return el;
}

function extend(target = {}, source) {
	let p;

	for (p in source) {
		target[p] = source[p];
	}
	return target;
}

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass || class {};
	}
	with(...mixins) {
		return mixins.reduce((c, m) => m(c), this.superclass);
	}
}

const Mixin = superclass => new MixinBuilder(superclass);

export {Mixin, $, extend};

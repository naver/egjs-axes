import {window} from "./browser";

declare var jQuery: any;

export function toArray(nodes: NodeList): HTMLElement[] {
	// const el = Array.prototype.slice.call(nodes);
	// for IE8
	const el = [];
	for (let i = 0, len = nodes.length;
		i < len; i++) {
			el.push(nodes[i]);
	}
	return el;
}

export function $(param, multi = false) {
	let el;

	if (typeof param === "string") {	// String (HTML, Selector)
		// check if string is HTML tag format
		const match = param.match(/^<([a-z]+)\s*([^>]*)>/);

		// creating element
		if (match) {	 // HTML
			const dummy = document.createElement("div");

			dummy.innerHTML = param;
			el = toArray(dummy.childNodes);
		} else {	// Selector
			el = toArray(document.querySelectorAll(param));
		}
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	} else if (param === window) { // window
		el = param;
	} else if (param.nodeName &&
		(param.nodeType === 1 || param.nodeType === 9)) {	// HTMLElement, Document
		el = param;
	} else if (("jQuery" in window && param instanceof jQuery) ||
		param.constructor.prototype.jquery) {	// jQuery
		el = multi ? param.toArray() : param.get(0);
	} else if (Array.isArray(param)) {
		el = param.map(v => $(v));
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	}
	return el;
}

let raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
let caf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
if (raf && !caf) {
	const keyInfo = {};
	const oldraf = raf;
	raf = (callback: FrameRequestCallback) => {
		function wrapCallback(timestamp) {
			if (keyInfo[key]) {
				callback(timestamp);
			}
		}
		const key = oldraf(wrapCallback);
		keyInfo[key] = true;
		return key;
	};
	caf = (key: number) => {
		delete keyInfo[key];
	};
} else if (!(raf && caf)) {
	raf = (callback: FrameRequestCallback) => {
		return window.setTimeout(() => {
			callback(window.performance && window.performance.now && window.performance.now() || new Date().getTime());
		}, 16);
	};
	caf = window.clearTimeout;
}

/**
 * A polyfill for the window.requestAnimationFrame() method.
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @private
 */
export function requestAnimationFrame(fp) {
	return raf(fp);
}
/**
* A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
* @param {Number} key −	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
* @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
* @private
*/
export function cancelAnimationFrame(key) {
	caf(key);
}

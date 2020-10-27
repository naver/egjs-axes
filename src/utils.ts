import {window} from "./browser";
import { ObjectInterface } from "./types";

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

export function map<T, U>(obj: ObjectInterface<T>, callback: (value: T, key: string) => U): ObjectInterface<U> {
	const tranformed: ObjectInterface<U> = {};

	for (const k in obj) {
		k && (tranformed[k] = callback(obj[k], k));
	}
	return tranformed;
}

export function filter<T>(obj: ObjectInterface<T>, callback: (value: T, key: string) => boolean): ObjectInterface<T> {
	const filtered: ObjectInterface<T> = {};

	for (const k in obj) {
		k && callback(obj[k], k) && (filtered[k] = obj[k]);
	}
	return filtered;
}
export function every<T>(obj: ObjectInterface<T>, callback: (value: T, key: string) => boolean) {
	for (const k in obj) {
		if (k && !callback(obj[k], k)) {
			return false;
		}
	}
	return true;
}
export function equal(target: ObjectInterface, base: ObjectInterface): boolean {
	return every(target, (v, k) => v === base[k]);
}

const roundNumFunc = {};

export function roundNumber(num: number, roundUnit: number) {
	// Cache for performance
	if (!roundNumFunc[roundUnit]) {
		roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
	}

	return roundNumFunc[roundUnit](num);
}

export function roundNumbers(num: ObjectInterface<number>, roundUnit: ObjectInterface<number> | number) {
	if (!num || !roundUnit) {
		return num;
	}
	const isNumber = typeof roundUnit === "number";
	return map(num, (value, key) => roundNumber(value, isNumber ? roundUnit : roundUnit[key]));
}

export function getDecimalPlace(val: number): number {
	if (!isFinite(val)) {
		return 0;
	}

	const v = (val + "");

	if (v.indexOf("e") >= 0) {
		// Exponential Format
		// 1e-10, 1e-12
		let p = 0;
		let e = 1;

		while (Math.round(val * e) / e !== val) {
			e *= 10;
			p++;
		}

		return p;
	}

	// In general, following has performance benefit.
	// https://jsperf.com/precision-calculation
	return v.indexOf(".") >= 0 ? (v.length - v.indexOf(".") - 1) : 0;
}

export function inversePow(n: number) {
	// replace Math.pow(10, -n) to solve floating point issue.
	// eg. Math.pow(10, -4) => 0.00009999999999999999
	return 1 / Math.pow(10, n);
}

export function getRoundFunc(v: number) {
	const p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;

	return (n: number) => {
		if (v === 0) {
			return 0;
		}

		return Math.round(Math.round(n / v) * v * p) / p;
	};
}

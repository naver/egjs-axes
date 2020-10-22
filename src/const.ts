// export const DIRECTION_NONE = 1;
// export const DIRECTION_LEFT = 2;
// export const DIRECTION_RIGHT = 4;
// export const DIRECTION_HORIZONTAL = 2 | 4;
// export const DIRECTION_UP = 8;
// export const DIRECTION_DOWN = 16;
// export const DIRECTION_VERTICAL = 8 | 16;
// export const DIRECTION_ALL = 2 | 4 | 8 | 16;

export {
	DIRECTION_NONE,
	DIRECTION_LEFT,
	DIRECTION_RIGHT,
	DIRECTION_UP,
	DIRECTION_DOWN,
	DIRECTION_HORIZONTAL,
	DIRECTION_VERTICAL,
	DIRECTION_ALL,
} from "@egjs/hammerjs";
import getAgent from "@egjs/agent";
import { window } from "./browser";

export const IOS_EDGE_THRESHOLD = 30;
export const IS_IOS_SAFARI = "ontouchstart" in window && getAgent().browser.name === "safari";

export const TRANSFORM = (() => {
	if (typeof document === "undefined") {
		return "";
	}
	const bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
	const target = ["transform", "webkitTransform", "msTransform", "mozTransform"];
	for (let i = 0, len = target.length; i < len; i++) {
		if (target[i] in bodyStyle) {
			return target[i];
		}
	}
	return "";
})();

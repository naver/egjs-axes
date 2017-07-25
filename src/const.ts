export enum DIRECTION {
    DIRECTION_NONE = 1,
    DIRECTION_LEFT = 2,
    DIRECTION_RIGHT = 4,
    DIRECTION_HORIZONTAL = 2 | 4,
    DIRECTION_UP = 8,
    DIRECTION_DOWN = 16,
	DIRECTION_VERTICAL = 8 | 16,
	DIRECTION_ALL = 2 | 4 | 8 | 16
}
export const TRANSFORM = (function() {
    const bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    const target = [ "transform", "webkitTransform", "msTransform", "mozTransform"];
    for (let i = 0, len = target.length; i < len; i++) {
        if (target[i] in bodyStyle) {
            return target[i];
        }
    }
    return "";
})();

export const UNIQUEKEY = "__EGJS_AXES__";
export const SUPPORT_TOUCH = "ontouchstart" in window;
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

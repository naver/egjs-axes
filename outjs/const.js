"use strict";
exports.__esModule = true;
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["DIRECTION_NONE"] = 1] = "DIRECTION_NONE";
    DIRECTION[DIRECTION["DIRECTION_LEFT"] = 2] = "DIRECTION_LEFT";
    DIRECTION[DIRECTION["DIRECTION_RIGHT"] = 4] = "DIRECTION_RIGHT";
    DIRECTION[DIRECTION["DIRECTION_HORIZONTAL"] = 6] = "DIRECTION_HORIZONTAL";
    DIRECTION[DIRECTION["DIRECTION_UP"] = 8] = "DIRECTION_UP";
    DIRECTION[DIRECTION["DIRECTION_DOWN"] = 16] = "DIRECTION_DOWN";
    DIRECTION[DIRECTION["DIRECTION_VERTICAL"] = 24] = "DIRECTION_VERTICAL";
    DIRECTION[DIRECTION["DIRECTION_ALL"] = 30] = "DIRECTION_ALL";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
exports.TRANSFORM = (function () {
    var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];
    for (var i = 0, len = target.length; i < len; i++) {
        if (target[i] in bodyStyle) {
            return target[i];
        }
    }
    return "";
})();

/**
 * @name eg.MovableCoord.DIRECTION_NONE
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_LEFT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_RIGHT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_UP
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_DOWN
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_HORIZONTAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_VERTICAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_ALL
 * @constant
 * @type {Number}
*/
export enum DIRECTION {
	DIRECTION_NONE = 1,
	DIRECTION_LEFT = 2,
	DIRECTION_RIGHT = 4,
	DIRECTION_UP = 8,
	DIRECTION_DOWN = 16,
	DIRECTION_HORIZONTAL = 2 | 4,
	DIRECTION_VERTICAL = 8 | 16,
	DIRECTION_ALL = 2 | 4 | 8 | 16
}

export const UNIQUEKEY = "__MOVABLECOORD__";
export const SUPPORT_TOUCH = "ontouchstart" in window;


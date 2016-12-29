MC._KEY = "__MOVABLECOORD__";

/**
 * @name eg.MovableCoord.DIRECTION_NONE
 * @constant
 * @type {Number}
 */
MC.DIRECTION_NONE = 1;
/**
 * @name eg.MovableCoord.DIRECTION_LEFT
 * @constant
 * @type {Number}
*/
MC.DIRECTION_LEFT = 2;
/**
 * @name eg.MovableCoord.DIRECTION_RIGHT
 * @constant
 * @type {Number}
*/
MC.DIRECTION_RIGHT = 4;
/**
 * @name eg.MovableCoord.DIRECTION_UP
 * @constant
 * @type {Number}
     */
MC.DIRECTION_UP = 8;
/**
 * @name eg.MovableCoord.DIRECTION_DOWN
 * @constant
 * @type {Number}
*/
MC.DIRECTION_DOWN = 16;
/**
 * @name eg.MovableCoord.DIRECTION_HORIZONTAL
 * @constant
 * @type {Number}
*/
MC.DIRECTION_HORIZONTAL = 2 | 4;
/**
 * @name eg.MovableCoord.DIRECTION_VERTICAL
 * @constant
 * @type {Number}
*/
MC.DIRECTION_VERTICAL = 8 | 16;

/**
 * @name eg.MovableCoord.DIRECTION_ALL
 * @constant
 * @type {Number}
*/
MC.DIRECTION_ALL = MC.DIRECTION_HORIZONTAL | MC.DIRECTION_VERTICAL;
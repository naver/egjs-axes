import { AxisOption } from "./Option.d";
export class Position {
  [key: string]: number
  static axes(pos: Position): Array<number> {
    const axes = [];

    for (const k in pos) {
      axes.push(k);
    }
    return axes;
  }
};

export class PositionManager {
  _pos: Position;
  constructor(axes: { [key: string]: AxisOption}) {
    this._pos = Object.keys(axes).reduce((acc, v) => {
      acc[v] = axes[v].range[0];
      return acc;
    }, {});
  }
  filter(axes?: Array<string>): Position {
    if (axes) {
      return axes.reduce((acc, v) => {
        acc[v] = this._pos[v];
        return acc;
      }, {});
    } else {
      return { ...this._pos };
    }
  }
  moveTo(pos: Position): Position {
    const movedPos = {};
    for (const k in pos) {
      this._pos[k] = pos[k];
      movedPos[k] = pos[k];
    }
    return movedPos;
  }
};

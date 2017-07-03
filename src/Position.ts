export class Position {
  private _pos: { [key:string] : number };
  get() {
    
  }
  axis() {
    let axis = [];

    for (let k in this._pos) {
      axis.push(k);
    }
    return axis;
  }
}
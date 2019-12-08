export default class Coordinates {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  set x(arg) {
    this._x = arg;
  }

  get y() {
    return this._y;
  }

  set y(arg) {
    this._y = arg;
  }

  public equals(other: Coordinates) {
    return false;
  }
}
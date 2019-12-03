export default class Coordinates {
  constructor(x, y) {
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
}
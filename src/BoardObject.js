import Coordinates from './Coordinates';

export default class BoardObject {
  constructor(x, y, width, height, color) {
    this._coordinates = new Coordinates(x, y);
    this._width = width;
    this._height = height;
    this._color = color;
  }

  get x() {
    return this._coordinates.x;
  }

  get y() {
    return this._coordinates.y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get color() {
    return this._color;
  }
}
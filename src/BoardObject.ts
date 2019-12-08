import Coordinates from './Coordinates';

export default class BoardObject {
  private _coordinates: Coordinates;
  private _width: number;
  private _height: number;
  private _color: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) {
    this._coordinates = new Coordinates(x, y);
    this._width = width;
    this._height = height;
    this._color = color;
  }

  get x() {
    return this._coordinates.x;
  }

  set x(arg) {
    this._coordinates.x = arg;
  }

  get y() {
    return this._coordinates.y;
  }

  set y(arg) {
    this._coordinates.y = arg;
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

  get coordinates() {
    return this._coordinates;
  }
}
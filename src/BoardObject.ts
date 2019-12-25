import Coordinates from './utils/Coordinates';
import { CELL_WIDTH, CELL_HEIGHT } from './constants/common';

export default class BoardObject {
  private _coordinates: Coordinates;
  private _width: number;
  private _height: number;

  constructor(
    x: number,
    y: number,
    width: number = CELL_WIDTH,
    height: number = CELL_HEIGHT,
  ) {
    this._coordinates = new Coordinates(x, y);
    this._width = width;
    this._height = height;
  }

  public copy() {
    return new BoardObject(
      this.x,
      this.y,
      this.width,
      this.height,
    );
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

  // FIXME: Should this be exposed?
  get coordinates() {
    return this._coordinates;
  }
}
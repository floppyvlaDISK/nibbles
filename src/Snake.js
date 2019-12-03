import BoardObject from './BoardObject';

// FIXME: Is snake a board object or a collection of board objects
export default class Snake extends BoardObject {
  constructor(x, y, width, height, color, direction) {
    super(x, y, width, height, color);
    this._direction = direction;
  }

  static DIRECTION_UP = 0;
  static DIRECTION_RIGHT = 1;
  static DIRECTION_BOTTOM = 2;
  static DIRECTION_LEFT = 3;

  move() {
    this._updateCoordinate();
  }

  _updateCoordinate() {
    switch (this._direction) {
      case Snake.DIRECTION_UP:
        this.y -= this.height;
        break;
      case Snake.DIRECTION_RIGHT:
        this.x += this.width;
        break;
      case Snake.DIRECTION_BOTTOM:
        this.y += this.height;
        break;
      case Snake.DIRECTION_LEFT:
        this.x -= this.width;
        break;
      default:
        throw new RangeError('Unknown direction');
    }
  }
}
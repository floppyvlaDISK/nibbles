import BoardObject from './BoardObject';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from './utils/isArrowKey';

// FIXME: Is snake a board object or a collection of board objects
export default class Snake extends BoardObject {
  constructor(x, y, width, height, color, direction) {
    super(x, y, width, height, color);
    this._direction = direction;
  }

  static DIRECTION_UP = 0;
  static DIRECTION_RIGHT = 1;
  static DIRECTION_DOWN = 2;
  static DIRECTION_LEFT = 3;

  setDirectionFromKeyCode(value) {
    const hash = {
      [ARROW_UP]: Snake.DIRECTION_UP,
      [ARROW_RIGHT]: Snake.DIRECTION_RIGHT,
      [ARROW_DOWN]: Snake.DIRECTION_DOWN,
      [ARROW_LEFT]: Snake.DIRECTION_LEFT,
    };
    this._direction = hash[value];
  }

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
      case Snake.DIRECTION_DOWN:
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
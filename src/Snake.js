import BoardObject from './BoardObject';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from './utils/isArrowKey';

// FIXME: Is snake a board object or a collection of board objects
// FIXME: Should I make direction a class and use polymorphism?
export default class Snake extends BoardObject {
  constructor(x, y, width, height, color, direction) {
    super(x, y, width, height, color);
    this._direction = direction;
  }

  static DIRECTION_UP = 'up';
  static DIRECTION_RIGHT = 'right';
  static DIRECTION_DOWN = 'down';
  static DIRECTION_LEFT = 'left';

  get direction() {
    return this._direction;
  }

  setDirectionFromKeyCode(value) {
    this._direction = this._getDirectionFromKeyCode(value);
  }

  move() {
    this._updateCoordinate();
  }

  _updateCoordinate() {
    const method = this._getUpdateCoordinateMethod();
    method();
  }

  _getUpdateCoordinateMethod() {
    const result = {
      [Snake.DIRECTION_UP]: this._moveUp.bind(this),
      [Snake.DIRECTION_RIGHT]: this._moveRight.bind(this),
      [Snake.DIRECTION_DOWN]: this._moveDown.bind(this),
      [Snake.DIRECTION_LEFT]: this._moveLeft.bind(this),
    }[this._direction];

    if (!result) {
        throw new RangeError('Unknown direction');
    }

    return result
  }

  _moveUp() {
    this.y -= this.height;
  }

  _moveRight() {
    this.x += this.width;
  }

  _moveDown() {
    this.y += this.height;
  }

  _moveLeft() {
    this.x -= this.width;
  }

  _getDirectionFromKeyCode(value) {
    let result = {
      [ARROW_UP]: Snake.DIRECTION_UP,
      [ARROW_RIGHT]: Snake.DIRECTION_RIGHT,
      [ARROW_DOWN]: Snake.DIRECTION_DOWN,
      [ARROW_LEFT]: Snake.DIRECTION_LEFT,
    }[value];

    if (!result) {
      throw new RangeError(`Unknown keyCode: ${value}`);
    }

    return result
  }
}
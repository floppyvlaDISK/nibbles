import BoardObject from './BoardObject';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from './utils/isArrowKey';

// FIXME: Is snake a board object or a collection of board objects
export default class Snake extends BoardObject {
  constructor(x, y, width, height, color, direction) {
    super(x, y, width, height, color);
    this._direction = direction;

    this._moveUp = this._moveUp.bind(this);
    this._moveRight = this._moveRight.bind(this);
    this._moveDown = this._moveDown.bind(this);
    this._moveLeft = this._moveLeft.bind(this);
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
    const method = {
      [Snake.DIRECTION_UP]: this._moveUp,
      [Snake.DIRECTION_RIGHT]: this._moveRight,
      [Snake.DIRECTION_DOWN]: this._moveDown,
      [Snake.DIRECTION_LEFT]: this._moveLeft,
    }[this._direction];

    if (!method) {
        throw new RangeError(`No update method found for direction: ${this._direction}`);
    }

    method();
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
      throw new RangeError(`No direction found from keyCode: ${value}`);
    }

    return result;
  }
}
import BoardObject from './BoardObject';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from './utils/isArrowKey';
import Target from './Target';

// FIXME: Is snake a board object or a collection of board objects
export default class Snake extends BoardObject {
  private _direction: string;
  private _score: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    direction: string,
    score: number,
  ) {
    super(x, y, width, height, color);
    this._direction = direction;
    this._score = score;

    this._moveUp = this._moveUp.bind(this);
    this._moveRight = this._moveRight.bind(this);
    this._moveDown = this._moveDown.bind(this);
    this._moveLeft = this._moveLeft.bind(this);
  }

  public static DIRECTION_UP = 'up';
  public static DIRECTION_RIGHT = 'right';
  public static DIRECTION_DOWN = 'down';
  public static DIRECTION_LEFT = 'left';

  public static directionFromKeyCode(value: number) {
    let result = {
      [ARROW_UP]: Snake.DIRECTION_UP,
      [ARROW_RIGHT]: Snake.DIRECTION_RIGHT,
      [ARROW_DOWN]: Snake.DIRECTION_DOWN,
      [ARROW_LEFT]: Snake.DIRECTION_LEFT,
    }[value];

    if (!result) {
      throw new RangeError(`Snake: no direction found from keyCode: ${value}`);
    }

    return result;
  }

  get direction() {
    return this._direction;
  }

  set direction(arg) {
    this._direction = arg;
  }

  get score() {
    return this._score;
  }

  public move() {
    this._updateCoordinate();
  }

  public eat(aTarget: Target) {
    this._increaseScoreBy(aTarget.value);
  }

  public canEat(aTarget: Target) {
    return this.coordinates.equals(aTarget.coordinates);
  }

  private _increaseScoreBy(value: number) {
    this._score += value;
  }

  private _updateCoordinate() {
    const method = {
      [Snake.DIRECTION_UP]: this._moveUp,
      [Snake.DIRECTION_RIGHT]: this._moveRight,
      [Snake.DIRECTION_DOWN]: this._moveDown,
      [Snake.DIRECTION_LEFT]: this._moveLeft,
    }[this._direction];

    if (!method) {
        throw new RangeError(`Snake: no update method found for direction: ${this._direction}`);
    }

    method();
  }

  private _moveUp() {
    this.y -= 1;
  }

  private _moveRight() {
    this.x += 1;
  }

  private _moveDown() {
    this.y += 1;
  }

  private _moveLeft() {
    this.x -= 1;
  }
}
import BoardObject from './BoardObject';
import LinkedList from './utils/LinkedList';
import Snake from './Snake';
import { CELL_WIDTH, CELL_HEIGHT } from './constants/common';
import Target from './Target';

// FIXME: Should I underscore this class to signal that it's an internal one?
export default class SnakeBody {
  private _head: BoardObject;
  private _body: LinkedList<BoardObject>;
  private _direction: string | undefined;
  private _initialDirection: string | undefined;

  constructor(
    head: BoardObject,
    direction: string | undefined // FIXME: Can I solve this without undefined?
  ) {
    this._head = head.copy();
    this._body = this._initialBody;
    this._direction = direction;
    this._initialDirection = direction;

    this._moveUp = this._moveUp.bind(this);
    this._moveRight = this._moveRight.bind(this);
    this._moveDown = this._moveDown.bind(this);
    this._moveLeft = this._moveLeft.bind(this);
  }

  get body() {
    return this._body;
  }

  get direction() {
    return this._direction;
  }

  set direction(arg: string) {
    if (this._isOpposite(arg)) {
      return;
    }
    this._direction = arg;
  }

  public reset() {
    this._body = this._initialBody;
    this._direction = this._initialDirection;
  }

  public move() {
    this._updateBodyPartsCoordinates();
    this._updateHeadCoordinate();
  }

  public canEat(aTarget: Target) {
    return this._body.head.coordinates.equals(aTarget.coordinates);
  }

  public hasEatenItself() {
    let result = false;
    this._body.forEach((obj: BoardObject) => {
      if (
        obj !== this._body.head
        && obj.coordinates.equals(this._body.head.coordinates)
      ) {
        result = true;
      }
    });
    return result;
  }

  public growBodyPart() {
    this._body.insert(
      new BoardObject(
        BoardObject.OFF_BOARD_CELL_INDEX,
        BoardObject.OFF_BOARD_CELL_INDEX,
        CELL_WIDTH,
        CELL_HEIGHT,
        this._body.head.color
      )
    );
  }

  private get _initialBody() {
    const result = new LinkedList<BoardObject>();
    result.insert(this._head.copy());
    return result;
  }

  private _updateBodyPartsCoordinates() {
    let prev: BoardObject;
    this._body.forEach((obj: BoardObject) => {
      if (!obj) {
        throw new TypeError('_updateBodyPartsCoordinates()');
      }
      const prevOriginal = obj.copy();
      if (obj !== this._body.head) {
        obj.x = prev.x;
        obj.y = prev.y;
      }
      prev = prevOriginal;
    });
  }

  private _updateHeadCoordinate() {
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
    this._body.head.y -= 1;
  }

  private _moveRight() {
    this._body.head.x += 1;
  }

  private _moveDown() {
    this._body.head.y += 1;
  }

  private _moveLeft() {
    this._body.head.x -= 1;
  }

  private _isOpposite(direction: string) {
    let result = {
      [Snake.DIRECTION_LEFT]: Snake.DIRECTION_RIGHT,
      [Snake.DIRECTION_RIGHT]: Snake.DIRECTION_LEFT,
      [Snake.DIRECTION_UP]: Snake.DIRECTION_DOWN,
      [Snake.DIRECTION_DOWN]: Snake.DIRECTION_UP,
    }[this._direction];

    return result === direction;
  }
}
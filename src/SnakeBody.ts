import BoardObject from './BoardObject';
import LinkedList from './utils/LinkedList';
import Snake from './Snake';
import { CELL_WIDTH, CELL_HEIGHT } from './CONST';
import Target from './Target';

export default class SnakeBody {
  private _head: BoardObject;
  private _body: LinkedList<BoardObject>;

  constructor(
    head: BoardObject,
  ) {
    this._head = head.copy();
    this._body = this.initialBody;

    this._moveUp = this._moveUp.bind(this);
    this._moveRight = this._moveRight.bind(this);
    this._moveDown = this._moveDown.bind(this);
    this._moveLeft = this._moveLeft.bind(this);
  }

  get body() {
    return this._body;
  }

  get initialBody() {
    const result = new LinkedList<BoardObject>();
    result.insert(this._head.copy());
    return result;
  }

  public reset() {
    this._body = this.initialBody;
  }

  public move(direction: string | undefined) {
    this._updateBodyPartsCoordinates();
    this._updateHeadCoordinate(direction);
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
        -1,
        -1,
        CELL_WIDTH,
        CELL_HEIGHT,
        this._body.head.color
      )
    );
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

  // TODO: Move direction to SnakeBody
  private _updateHeadCoordinate(direction: string | undefined) {
    const method = {
      [Snake.DIRECTION_UP]: this._moveUp,
      [Snake.DIRECTION_RIGHT]: this._moveRight,
      [Snake.DIRECTION_DOWN]: this._moveDown,
      [Snake.DIRECTION_LEFT]: this._moveLeft,
    }[direction];

    if (!method) {
      throw new RangeError(`Snake: no update method found for direction: ${direction}`);
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
}
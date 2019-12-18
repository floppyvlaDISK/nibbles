import BoardObject from './BoardObject';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from './utils/isArrowKey';
import Target from './Target';
import LinkedList from './utils/LinkedList';
import { CELL_WIDTH, CELL_HEIGHT } from './CONST';
import SnakeBody from './SnakeBody';

// FIXME: create SnakeBody class
export default class Snake {
  private _direction: string | undefined;
  private _initialDirection: string;
  private _score: number;
  private _initialScore: number;
  private _body: LinkedList<BoardObject>;
  private _xxxbody: SnakeBody;

  constructor(
    head: BoardObject,
    direction: string,
    score: number,
  ) {
    this._direction = direction;
    this._initialDirection = direction;

    this._score = score;
    this._initialScore = score;

    this._xxxbody = new SnakeBody(head);

    this._body = this._initialBody;

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
    if (this._isOpposite(arg)) {
      return;
    }
    this._direction = arg;
  }

  get score() {
    return this._score;
  }

  get body() {
    return this._body;
  }

  public move() {
    this._updateBodyPartsCoordinates();
    this._updateHeadCoordinate();
  }

  public die() {
    this._body = this._initialBody;
    this._score = this._initialScore;
    this.direction = this._initialDirection;
  }

  public eat(aTarget: Target) {
    this._increaseScoreBy(aTarget.value);
    this._growBodyPart();
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

  private get _initialBody() {
    return this._xxxbody.initialBody;
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

  private _growBodyPart() {
    this._body.insert(
      new BoardObject(
        -1,
        -1,
        CELL_WIDTH,
        CELL_HEIGHT,
        this._xxxbody.body.head.color
      )
    );
  }

  private _increaseScoreBy(value: number) {
    this._score += value;
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
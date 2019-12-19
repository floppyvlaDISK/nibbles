import BoardObject from './BoardObject';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from './utils/isArrowKey';
import Target from './Target';
import SnakeBody from './SnakeBody';

export default class Snake {
  private _score: number;
  private _initialScore: number;
  private _snakeBody: SnakeBody;

  constructor(
    head: BoardObject,
    direction: string,
    score: number,
  ) {
    this._score = score;
    this._initialScore = score;
    this._snakeBody = new SnakeBody(head, direction);
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
    return this._snakeBody.direction;
  }

  set direction(arg: string) {
    this._snakeBody.direction = arg;
  }

  get score() {
    return this._score;
  }

  get body() {
    return this._snakeBody.body;
  }

  public move() {
    this._snakeBody.move();
  }

  public die() {
    this._snakeBody.reset();
    this._score = this._initialScore;
  }

  public eat(aTarget: Target) {
    this._increaseScoreBy(aTarget.value);
    this._snakeBody.growBodyPart();
  }

  public canEat(aTarget: Target) {
    return this._snakeBody.canEat(aTarget);
  }

  public hasEatenItself() {
    return this._snakeBody.hasEatenItself();
  }

  private _increaseScoreBy(value: number) {
    this._score += value;
  }
}
import BoardObject from './BoardObject';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from './utils/isArrowKey';
import Target from './Target';
import SnakeBody from './SnakeBody';
import SnakeScore from './SnakeScore';

export default class Snake {
  private _snakeBody: SnakeBody;
  private _snakeScore: SnakeScore;

  constructor(
    head: BoardObject,
    direction: string,
    score: number,
  ) {
    this._snakeBody = new SnakeBody(head, direction);
    this._snakeScore = new SnakeScore(score);
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
    return this._snakeScore.score;
  }

  get body() {
    return this._snakeBody.body;
  }

  get headCoordinates() {
    return this._snakeBody.body.head.coordinates;
  }

  public forEachBodyPart(fn: Function) {
    this._snakeBody.body.forEach(fn);
  }

  public move() {
    this._snakeBody.move();
  }

  public die() {
    this._snakeBody.reset();
    this._snakeScore.reset();
  }

  public eat(aTarget: Target) {
    this._snakeScore.increaseBy(aTarget.value);
    this._snakeBody.growBodyPart();
  }

  public canEat(aTarget: Target) {
    return this._snakeBody.canEat(aTarget);
  }

  public hasEatenItself() {
    return this._snakeBody.hasEatenItself();
  }
}
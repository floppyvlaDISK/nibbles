import Snake from './Snake';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import Target from './Target';
import randomWithin from './utils/randomWithin';
import Coordinates from './Coordinates';

export default class Nibbles {
  private _renderer: Renderer;
  private _snake: Snake;
  private _target: Target;
  private _walls: Array<BoardObject>;
  private _snakeDirectionsQueue: Array<string>;

  constructor(
    renderer: Renderer,
    snake: Snake,
    target: Target,
    walls: Array<BoardObject>,
  ) {
    this._renderer = renderer;
    this._snake = snake;
    this._target = target;
    this._walls = walls;
    this._snakeDirectionsQueue = [];

    this._performUpdate = this._performUpdate.bind(this);
  }

  public render() {
    this._renderer.renderBoard();
    this._getBoardObjects().forEach(
      obj => this._renderer.renderBoardObject(obj)
    );
  }

  public start() {
    this._performUpdate();
    setInterval(this._performUpdate, 750);
  }

  public setSnakeDirectionFromKeyCode(value: number) {
    const latest = [...this._snakeDirectionsQueue].pop();
    if (latest !== Snake.directionFromKeyCode(value)) {
      this._snakeDirectionsQueue.push(Snake.directionFromKeyCode(value));
    }
  }

  private _getBoardObjects() {
    return [
      this._target,
      ...this._walls,
      this._snake,
    ];
  }

  private _performUpdate() {
    this._trySetSnakeDirectionFromQueue();
    this._updateBoardObjects();
    this.render();
  }

  private _updateBoardObjects() {
    this._snake.move();
    if (this._snake.canEat(this._target)) {
      this._snake.eat(this._target);
      this._setNextTargetPosition();
    }
  }

  private _setNextTargetPosition() {
    // TODO: 40 should be a const
    let nextX;
    let nextY;
    while (
      typeof nextX === 'undefined'
      || typeof nextY === 'undefined'
    ) {
      nextX = randomWithin(40, Renderer.WIDTH - 40);
      nextY = randomWithin(40, Renderer.HEIGHT - 40);
      if (
        this._snake.coordinates.equals(new Coordinates(nextX, nextY))
        || this._target.coordinates.equals(new Coordinates(nextX, nextY))
        || !Number.isInteger(nextX / 40)
        || !Number.isInteger(nextY / 40)
      ) {
        nextX = undefined;
        nextY = undefined;
      }
    }
    this._target.x = nextX;
    this._target.y = nextY;
  }

  private _trySetSnakeDirectionFromQueue() {
    const nextDirection = this._snakeDirectionsQueue.shift();
    if (nextDirection) {
      this._snake.direction = nextDirection;
    }
  }
}
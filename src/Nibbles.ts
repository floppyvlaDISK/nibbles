import Snake from './Snake';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import Target from './Target';
import randomWithin from './utils/randomWithin';
import Coordinates from './Coordinates';
import PubSub from './utils/PubSub';

export default class Nibbles {
  private _renderer: Renderer;
  private _snake: Snake;
  private _target: Target;
  private _walls: Array<BoardObject>;
  private _pubSub: PubSub;
  private _snakeDirectionsQueue: Array<string>;
  private _intervalId: number | undefined;

  constructor(
    renderer: Renderer,
    snake: Snake,
    target: Target,
    walls: Array<BoardObject>,
    pubSub: PubSub,
  ) {
    this._renderer = renderer;
    this._snake = snake;
    this._target = target;
    this._walls = walls;
    this._pubSub = pubSub;
    this._snakeDirectionsQueue = [];
    this._intervalId = undefined;

    this._performUpdate = this._performUpdate.bind(this);
  }

  public static UPDATE_FREQUENCY_MS = 750;

  public render() {
    this._renderer.renderBoard();
    this._getBoardObjects().forEach(
      obj => this._renderer.renderBoardObject(obj)
    );
  }

  public start() {
    if (this._intervalId) {
      return;
    }
    this._performUpdate();
    this._intervalId = window.setInterval(this._performUpdate, Nibbles.UPDATE_FREQUENCY_MS);
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
    if (this._hasSnakeDied()) {
      this._snake.die();
      this._reset();
    }
    this.render();
  }

  private _reset() {
    this._snakeDirectionsQueue = [];
    window.clearInterval(this._intervalId);
    this._intervalId = undefined;
  }

  private _updateBoardObjects() {
    this._snake.move();
    if (this._snake.canEat(this._target)) {
      this._snake.eat(this._target);
      this._spawnTargetInNextPosition();
    }
  }

  private _spawnTargetInNextPosition() {
    let result;
    while (!result) {
      result = new Coordinates(randomWithin(1, 18), randomWithin(1, 18));
      if (this._isOccupied(result)) {
        result = undefined;
      }
    }
    this._target.x = result.x;
    this._target.y = result.y;
  }


  private _trySetSnakeDirectionFromQueue() {
    const nextDirection = this._snakeDirectionsQueue.shift();
    if (nextDirection) {
      this._snake.direction = nextDirection;
    }
  }

  private _isOccupied(aCoordinate: Coordinates) {
    return [this._snake, this._target].some(
      obj => obj.coordinates.equals(aCoordinate)
    );
  }

  private _hasSnakeDied() {
    return this._walls.some(
      w => w.coordinates.equalsPartially(this._snake.coordinates)
    );
  }
}
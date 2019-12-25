import Snake from './Snake';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import Target from './Target';
import randomWithin from './utils/randomWithin';
import Coordinates from './utils/Coordinates';
import PubSub from './utils/PubSub';
import TargetRenderer from './TargetRenderer';
import SnakeRenderer from './SnakeRenderer';
import BoardColoredObject from './BoardColoredObject';

export default class Nibbles {
  private _renderer: Renderer;
  private _targetRenderer: TargetRenderer;
  private _snakeRenderer: SnakeRenderer;
  private _board: BoardColoredObject;
  private _snake: Snake;
  private _target: Target;
  private _walls: Array<BoardColoredObject>;
  private _pubSub: PubSub;
  private _snakeDirectionsQueue: Array<string>;
  private _intervalId: number | undefined;

  constructor(
    renderer: Renderer,
    board: BoardColoredObject,
    snake: Snake,
    target: Target,
    walls: Array<BoardColoredObject>,
    pubSub: PubSub,
    targetRenderer: TargetRenderer,
    snakeRenderer: SnakeRenderer,
  ) {
    this._renderer = renderer;
    this._targetRenderer = targetRenderer;
    this._snakeRenderer = snakeRenderer;
    this._board = board;
    this._snake = snake;
    this._target = target;
    this._walls = walls;
    this._pubSub = pubSub;
    this._snakeDirectionsQueue = [];
    this._intervalId = undefined;

    this._performUpdate = this._performUpdate.bind(this);
  }

  public static UPDATE_FREQUENCY_MS = 100;

  public render() {
    [this._board, ...this._walls].forEach(
      obj => this._renderer.render(obj)
    );
    this._targetRenderer.render();
    this._snakeRenderer.render();
  }

  public start() {
    if (this._hasStarted()) {
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

  private _hasStarted() {
    return !!this._intervalId;
  }

  private _performUpdate() {
    this._trySetSnakeDirectionFromQueue();
    this._snake.move();
    if (this._snake.canEat(this._target)) {
      this._handleSnakeEatsTheTarget();
    }
    if (this._shouldSnakeDie()) {
      this._handleSnakeDies();
    }
    this.render();
  }

  private _handleSnakeEatsTheTarget() {
    this._snake.eat(this._target);
    this._spawnTargetInNextPosition();
    this._pubSub.publish('SnakeScoreChanged', this._snake.score);
  }

  private _handleSnakeDies() {
    this._snake.die();
    this._reset();
    this._pubSub.publish('SnakeScoreChanged', this._snake.score);
  }

  private _reset() {
    this._snakeDirectionsQueue = [];
    window.clearInterval(this._intervalId);
    this._intervalId = undefined;
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

  private _isOccupied(aCoordinates: Coordinates) {
    return this._isOccupiedByTarget(aCoordinates)
      || this._isOccupiedBySnake(aCoordinates);
  }

  private _isOccupiedByTarget(aCoordinates: Coordinates) {
    return this._target.coordinatesEqual(aCoordinates);
  }

  private _isOccupiedBySnake(aCoordinates: Coordinates) {
    let result = false;
    this._snake.forEachBodyPart(
      (obj: BoardObject) => {
        result = obj.coordinatesEqual(aCoordinates) || result;
      }
    );
    return result;
  }

  private _shouldSnakeDie() {
    return this._hasSnakeCollidedWithTheWall() || this._snake.hasEatenItself();
  }

  private _hasSnakeCollidedWithTheWall() {
    return this._walls.some(
      w => w.coordinatesEqualPartially(this._snake.headCoordinates)
    );
  }
}
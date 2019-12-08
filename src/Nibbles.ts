import Snake from './Snake';
import Renderer from './Renderer';
import BoardObject from './BoardObject';

export default class Nibbles {
  private _renderer: Renderer;
  private _snake: Snake;
  private _target: BoardObject;
  private _walls: Array<BoardObject>;
  private _snakeDirectionsQueue: Array<string>;

  constructor(
    renderer: Renderer,
    snake: Snake,
    target: BoardObject,
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
    this._updateBoardObjectsPositions();
    this.render();
  }

  private _updateBoardObjectsPositions() {
    this._snake.move();
  }

  private _trySetSnakeDirectionFromQueue() {
    const nextDirection = this._snakeDirectionsQueue.shift();
    if (nextDirection) {
      this._snake.direction = nextDirection;
    }
  }
}
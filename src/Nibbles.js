import Snake from './Snake';

export default class Nibbles {
  constructor(renderer, snake, target) {
    this._renderer = renderer;
    this._snake = snake;
    this._target = target;
    this._intervalId = null;
    this._snakeDirectionsQueue = [];

    this._performUpdate = this._performUpdate.bind(this);
  }

  render() {
    this._renderer.renderBoard();
    this._getBoardObjects().forEach(
      obj => this._renderer.renderBoardObject(obj)
    );
  }

  start() {
    this._performUpdate();
    this._intervalId = setInterval(this._performUpdate, 750);
  }

  setSnakeDirectionFromKeyCode(value) {
    // TODO: ignore is latest equals to value
    this._snakeDirectionsQueue.push(Snake.directionFromKeyCode(value));
  }

  _getBoardObjects() {
    return [this._target, this._snake];
  }

  _performUpdate() {
    this._trySetSnakeDirectionFromQueue();
    this._updateBoardObjectsPositions();
    this.render();
  }

  _updateBoardObjectsPositions() {
    this._snake.move();
  }

  _trySetSnakeDirectionFromQueue() {
    const nextDirection = this._snakeDirectionsQueue.shift();
    if (nextDirection) {
      this._snake.direction = nextDirection;
    }
  }
}
export default class Nibbles {
  constructor(renderer, snake, target) {
    this._renderer = renderer;
    this._snake = snake;
    this._target = target;
    this._intervalId = null;
    this._queuedSnakeDirectionChanges = [];

    this._performUpdate = this._performUpdate.bind(this);
  }

  render() {
    this._renderer.renderBoard();
    this._renderer.renderBoardObject(this._snake);
    this._renderer.renderBoardObject(this._target);
  }

  start() {
    this._performUpdate();
    this._intervalId = setInterval(this._performUpdate, 750);
  }

  setSnakeDirectionFromKeyCode(value) {
    this._queuedSnakeDirectionChanges.push(value);
  }

  _performUpdate() {
    this._trySetSnakeDirectionFromQueuedKeyCode();
    this._updateBoardObjectsPositions();
    this.render();
  }

  _updateBoardObjectsPositions() {
    this._snake.move();
  }

  _trySetSnakeDirectionFromQueuedKeyCode() {
    const nextKeyCode = this._queuedSnakeDirectionChanges.shift();
    if (nextKeyCode) {
      this._snake.setDirectionFromKeyCode(nextKeyCode);
    }
  }
}
export default class Nibbles {
  constructor(renderer, snake, target) {
    this._renderer = renderer;
    this._snake = snake;
    this._target = target;
    this._intervalId = null;
  }

  render() {
    this._renderer.renderBoard();
    this._renderer.renderBoardObject(this._snake);
    this._renderer.renderBoardObject(this._target);
  }

  start() {
    this.render();
    this._intervalId = setInterval(() => {
      this._updateBoardObjectsPosition();
      this.render();
    }, 750);
  }

  _updateBoardObjectsPosition() {
    this._snake.move();
  }
}
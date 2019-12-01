export default class Nibbles {
  constructor(renderer, snake, target) {
    this._renderer = renderer;
    this._snake = snake;
    this._target = target;
  }

  render() {
    this._renderer.renderBoard();
    this._renderer.renderBoardObject(this._snake);
    this._renderer.renderBoardObject(this._target);
  }
}
import Renderer from './Renderer';

export default class Nibbles {
  constructor(container) {
    this._renderer = new Renderer(container);
    // this._snake = new Snake();
    // this._target = new SnakeTarget();
  }

  render() {
    this._renderer.renderBoard();
    // this._renderer.renderBoardObject(this._snake);
    // this._renderer.renderBoardObject(this._target);
  }
}
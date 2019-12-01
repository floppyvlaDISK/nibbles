import Renderer from './Renderer';

export default class Nibbles {
  constructor(container) {
    this._renderer = new Renderer(container);
  }

  render() {
    this._renderer.drawBoard();
  }
}
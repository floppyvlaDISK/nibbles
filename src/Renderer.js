export default class Renderer {
  constructor(container) {
    this._canvas = Renderer._createCanvas(container);
  }

  static WIDTH = 1000;
  static HEIGHT = 800;

  static _createCanvas(container) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${Renderer.WIDTH}px`);
    canvas.setAttribute('height', `${Renderer.HEIGHT}px`);
    container.appendChild(canvas);
    return canvas;
  }

  get ctx() {
    return this._canvas.getContext('2d');
  }

  drawBoard() {
    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(0, 0, Renderer.WIDTH, Renderer.HEIGHT);
  }
}
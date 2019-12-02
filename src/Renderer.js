export default class Renderer {
  constructor(container) {
    this._canvas = Renderer._createCanvas(container);
  }

  static WIDTH = 800;
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

  renderBoard() {
    // FIXME: Is board a board object itself?
    this.ctx.fillStyle = '#FFE4E1';
    this.ctx.fillRect(0, 0, Renderer.WIDTH, Renderer.HEIGHT);
  }

  renderBoardObject(aBoardObject) {
    this.ctx.fillStyle = aBoardObject.color;
    this.ctx.fillRect(
      aBoardObject.x,
      aBoardObject.y,
      aBoardObject.width,
      aBoardObject.height,
    );
  }
}
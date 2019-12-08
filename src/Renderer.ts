import BoardObject from './BoardObject';

export default class Renderer {
  private _canvas: HTMLCanvasElement;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new RangeError('Renderer: container is not a valid HTMLElement');
    }
    this._canvas = Renderer._createCanvas(container);
  }

  public static WIDTH = 800;
  public static HEIGHT = 800;

  private static _createCanvas(container: HTMLElement) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${Renderer.WIDTH}px`);
    canvas.setAttribute('height', `${Renderer.HEIGHT}px`);
    container.appendChild(canvas);
    return canvas;
  }

  get ctx() {
    const result = this._canvas.getContext('2d');
    if (!result) {
      throw new RangeError('Renderer: could not get context of canvas');
    }
    return result;
  }

  public renderBoard() {
    // FIXME: Is board a board object itself?
    this.ctx.fillStyle = '#FFE4E1';
    this.ctx.fillRect(0, 0, Renderer.WIDTH, Renderer.HEIGHT);
  }

  public renderBoardObject(aBoardObject: BoardObject) {
    this.ctx.fillStyle = aBoardObject.color;
    this.ctx.fillRect(
      aBoardObject.x,
      aBoardObject.y,
      aBoardObject.width,
      aBoardObject.height,
    );
  }
}
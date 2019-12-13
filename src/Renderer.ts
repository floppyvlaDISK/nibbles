import BoardObject from './BoardObject';
import { BOARD_WIDTH, BOARD_HEIGHT } from './CONST';

export default class Renderer {
  private _canvas: HTMLCanvasElement;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new RangeError('Renderer: container is not a valid HTMLElement');
    }
    this._canvas = Renderer._createCanvas(container);
  }

  private static _createCanvas(container: HTMLElement) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${BOARD_WIDTH}px`);
    canvas.setAttribute('height', `${BOARD_HEIGHT}px`);
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

  public render(aBoardObject: BoardObject) {
    this.ctx.fillStyle = aBoardObject.color;
    this.ctx.fillRect(
      aBoardObject.x * aBoardObject.width,
      aBoardObject.y * aBoardObject.height,
      aBoardObject.width,
      aBoardObject.height,
    );
  }
}
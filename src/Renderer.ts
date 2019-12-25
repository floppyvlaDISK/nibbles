import { BOARD_WIDTH, BOARD_HEIGHT } from './constants/common';
import BoardImageObject from './BoardImageObject';
import BoardColoredObject from './BoardColoredObject';

export default class Renderer {
  private _canvas: HTMLCanvasElement;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new RangeError('Renderer: container is not a valid HTMLElement');
    }
    this._canvas = Renderer._createCanvas(container);
  }

  public render(obj: BoardColoredObject) {
    this._ctx.fillStyle = obj.color;
    this._ctx.fillRect(
      obj.x * obj.width,
      obj.y * obj.height,
      obj.width,
      obj.height,
    );
  }

  public renderImage(obj: BoardImageObject) {
    this._ctx.drawImage(
      obj.image,
      obj.sourceX,
      obj.sourceY,
      obj.sourceWidth,
      obj.sourceHeight,
      obj.x * obj.width,
      obj.y * obj.height,
      obj.width,
      obj.height
    );
  }

  private static _createCanvas(container: HTMLElement) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${BOARD_WIDTH}px`);
    canvas.setAttribute('height', `${BOARD_HEIGHT}px`);
    container.appendChild(canvas);
    return canvas;
  }

  private get _ctx() {
    const result = this._canvas.getContext('2d');
    if (!result) {
      throw new RangeError('Renderer: could not get context of canvas');
    }
    return result;
  }
}
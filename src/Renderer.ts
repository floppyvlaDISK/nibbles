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

  public render(obj: BoardObject) {
    this._ctx.fillStyle = obj.color;
    this._ctx.fillRect(
      obj.x * obj.width,
      obj.y * obj.height,
      obj.width,
      obj.height,
    );
  }

  public renderImage(obj: BoardObject) {
    const anImage = new Image();
    anImage.onload = () => {
      this._ctx.drawImage(
        anImage,
        0,
        192,
        64,
        64,
        obj.x * obj.width,
        obj.y * obj.height,
        obj.width,
        obj.height
      );
    }
    anImage.src = 'snake-sprite.png';
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
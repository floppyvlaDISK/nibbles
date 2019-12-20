import BoardObject from './BoardObject';

export default class BoardImageObject extends BoardObject {
  private _image: HTMLImageElement;
  private _sourceX: number;
  private _sourceY: number;
  private _sourceWidth: number;
  private _sourceHeight: number;

  constructor(
    image: HTMLImageElement,
    sourceX: number,
    sourceY: number,
    sourceWidth: number,
    sourceHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    super(x, y, width, height, '');
    this._image = image;
    this._sourceX = sourceX;
    this._sourceY = sourceY;
    this._sourceWidth = sourceWidth;
    this._sourceHeight = sourceHeight;
  }

  get image() {
    return this._image;
  }

  get sourceX() {
    return this._sourceX;
  }

  get sourceY() {
    return this._sourceY;
  }

  get sourceWidth() {
    return this._sourceWidth;
  }

  get sourceHeight() {
    return this._sourceHeight;
  }
}
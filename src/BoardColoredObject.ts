import BoardObject from './BoardObject';

export default class BoardColoredObject extends BoardObject {
  private _color: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) {
    super(x, y, width, height);
    this._color = color;
  }

  // FIXME: does it need to override copy()?

  get color() {
    return this._color;
  }
}
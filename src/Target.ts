import BoardObject from './BoardObject';

export default class Target extends BoardObject {
  private _value: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    value: number,
  ) {
    super(x, y, width, height);
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
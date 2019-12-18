import BoardObject from './BoardObject';
import LinkedList from './utils/LinkedList';

export default class SnakeBody {
  private _head: BoardObject;
  private _body: LinkedList<BoardObject>;

  constructor(
    head: BoardObject,
  ) {
    this._head = head.copy();
    this._body = this.initialBody;
  }

  get body() {
    return this._body;
  }

  get initialBody() {
    const result = new LinkedList<BoardObject>();
    result.insert(this._head.copy());
    return result;
  }

  public reset() {
    this._body = this.initialBody;
  }
}
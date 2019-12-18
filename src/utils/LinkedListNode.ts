export default class LinkedListNode<T> {
  private _content: T;
  private _nextKey: string | null;

  constructor(content: T, nextKey: string | null) {
    this._content = content;
    this._nextKey = nextKey;
  }

  get content() {
    return this._content;
  }

  set content(arg: T) {
    this._content = arg;
  }

  get nextKey() {
    return this._nextKey;
  }

  set nextKey(arg: string | null) {
    this._nextKey = arg;
  }
}
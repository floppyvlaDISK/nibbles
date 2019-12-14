export default class LinkedListNode {
  private _content: any;
  private _nextKey: string | null;

  constructor(content: any, nextKey: string | null) {
    this._content = content;
    this._nextKey = nextKey;
  }

  get content() {
    return this._content;
  }

  set content(arg) {
    this._content = arg;
  }

  get nextKey() {
    return this._nextKey;
  }

  set nextKey(arg: string | null) {
    this._nextKey = arg;
  }
}
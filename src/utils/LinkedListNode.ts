export default class LinkedListNode {
  private _content: any;
  private _nextIndex: number;

  constructor(content: any, nextIndex: number) {
    this._content = content;
    this._nextIndex = nextIndex;
  }

  get content() {
    return this._content;
  }

  set content(arg) {
    this._content = arg;
  }

  get nextIndex() {
    return this._nextIndex;
  }
}
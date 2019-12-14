import LinkedListNode from './LinkedListNode';
import randomString from './randomString';

export default class LinkedList {
  private _nodes: Map<string, LinkedListNode> = new Map();
  private _tailKey: string | null = null;
  private _headKey: string | null = null;
  private _currKey: string | null = null;

  public insert(content: any) {
    const newNodeKey = randomString();
    this._updateTail(newNodeKey);
    this._updateHead(newNodeKey);
    this._resetCurr();
    this._addNode(content, newNodeKey);
  }

  public forEach(fn: Function) {
    this._resetCurr();
    while (this._currKey) {
      fn(this.next());
    }
  }

  public next() {
    if (!this._currKey) {
      return undefined;
    }
    const node = this._nodes.get(this._currKey);
    if (!(node instanceof LinkedListNode)) {
      return undefined;
    }
    this._currKey = node.nextKey;
    return node.content;
  }

  private _getTail() {
    return this._tailKey && this._nodes.get(this._tailKey);
  }

  private _updateTail(newNodeKey: string) {
    const tail = this._getTail();
    if (tail) {
      tail.nextKey = newNodeKey;
    }
    this._tailKey = newNodeKey;
  }

  private _updateHead(newNodeKey: string) {
    if (!this._headKey) {
      this._headKey = newNodeKey;
    }
  }

  private _addNode(content: any, key: string) {
    this._nodes.set(key, new LinkedListNode(content, null));
  }

  private _resetCurr() {
    this._currKey = this._headKey;
  }
}
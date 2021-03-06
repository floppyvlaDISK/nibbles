import LinkedListNode from './LinkedListNode';
import randomString from './randomString';

export default class LinkedList<T> {
  private _nodes: Map<string, LinkedListNode<T>> = new Map();
  private _tailKey: string | null = null;
  private _headKey: string | null = null;
  private _currKey: string | null = null;

  public insert(content: T) {
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

  get head() {
    return this._getNodeContentBy(this._headKey);
  }

  get tail() {
    return this._getNodeContentBy(this._tailKey);
  }

  get length() {
    return this._nodes.size;
  }

  private _getNodeContentBy(key: string | null) {
    const node = this._getNodeBy(key);
    return node instanceof LinkedListNode ? node.content : undefined;
  }

  private _getNodeBy(key: string | null) {
    return key && this._nodes.get(key);
  }

  private _updateTail(newNodeKey: string) {
    const tail = this._getNodeBy(this._tailKey)
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

  private _addNode(content: T, key: string) {
    this._nodes.set(key, new LinkedListNode(content, null));
  }

  private _resetCurr() {
    this._currKey = this._headKey;
  }
}
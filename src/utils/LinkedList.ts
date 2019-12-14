import LinkedListNode from './LinkedListNode';
import randomString from './randomString';

// FIXME: Refactor
export default class LinkedList {
  private _nodes: Map<string, LinkedListNode> = new Map();
  private _tailKey: string | null = null;
  private _headKey: string | null = null;
  private _currKey: string | null = null;

  public insert(content: any) {
    const newNodeKey = randomString();

    const tail = this._getTail();
    if (tail) {
      tail.nextKey = newNodeKey;
    }

    this._tailKey = newNodeKey;

    if (!this._headKey) {
      this._headKey = newNodeKey;
      this._currKey = this._headKey;
    }

    this._nodes.set(
      newNodeKey,
      new LinkedListNode(content, null)
    );
  }

  public forEach(fn: Function) {
    this._currKey = this._headKey;
    while (this._currKey) {
      const node = this._nodes.get(this._currKey);
      if (!(node instanceof LinkedListNode)) {
        break;
      }
      fn(node.content);
      this._currKey = node.nextKey;
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
    return this._tailKey == null
      ? null
      : this._nodes.get(this._tailKey);
  }
}
import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  private _nodes: Array<LinkedListNode> = [];
  private _tailIndex: number = 0;

  constructor() {
    this._nodes = [];
    this._tailIndex = 0;
  }

  public insert(content: any) {
    this._nodes.push(new LinkedListNode(content, this._tailIndex + 1));
    this._tailIndex = this._tailIndex + 1;
  }

  public forEach(fn: Function) {
    let index = 0; // FIXME: Assuming 0 is always the head
    while (this._nodes[index]) {
      fn(this._nodes[index].content);
      index = this._nodes[index].nextIndex;
    }
  }

  get tailIndex() {
    return this._tailIndex;
  }

  get nodes() {
    return [...this._nodes];
  }
}

/*
  head -> part -> part -> part -> part
*/
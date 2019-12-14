import LinkedList from '../../src/utils/LinkedList';

describe('LinkedList', () => {
  it('insert()', () => {
    const aLinkedList = new LinkedList();

    aLinkedList.insert('1');
    aLinkedList.insert('2');

    expect(aLinkedList.tailIndex).toBe(2);
    expect(aLinkedList.nodes.length).toBe(2);
    expect(aLinkedList.nodes[0].content).toBe('1');
    expect(aLinkedList.nodes[0].nextIndex).toBe(1);
    expect(aLinkedList.nodes[1].content).toBe('2');
    expect(aLinkedList.nodes[1].nextIndex).toBe(2);
  });
});
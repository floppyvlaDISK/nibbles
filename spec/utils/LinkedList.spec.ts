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

  it('forEach()', () => {
    const aLinkedList = new LinkedList();
    const spy = jasmine.createSpy();

    aLinkedList.insert('1');
    aLinkedList.insert('2');
    aLinkedList.forEach(spy);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.calls.argsFor(0)).toEqual(['1']);
    expect(spy.calls.argsFor(1)).toEqual(['2']);
  });
});
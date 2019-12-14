import LinkedList from '../../src/utils/LinkedList';

describe('LinkedList', () => {
  it('next()', () => {
    const aLinkedList = new LinkedList();

    aLinkedList.insert('1');
    aLinkedList.insert('2');

    expect(aLinkedList.next()).toBe('1');
    expect(aLinkedList.next()).toBe('2');
    expect(aLinkedList.next()).toBe(undefined);
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
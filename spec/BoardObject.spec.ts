import BoardObject from '../src/BoardObject';

describe('BoardObject', () => {
  it('copy()', () => {
    const o = new BoardObject(10, 15);

    expect(o.copy() === o).toBe(false);
    expect(o.copy()).toEqual(o);
  });
});
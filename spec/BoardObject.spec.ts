import BoardObject from '../src/BoardObject';
import { CELL_WIDTH, CELL_HEIGHT } from '../src/CONST';

describe('BoardObject', () => {
  it('copy()', () => {
    const o = new BoardObject(10, 15, CELL_WIDTH, CELL_HEIGHT, 'red');

    expect(o.copy() === o).toBe(false);
    expect(o.copy()).toEqual(o);
  });
});
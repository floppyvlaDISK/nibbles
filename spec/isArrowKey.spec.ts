import isArrowKey, { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from '../src/utils/isArrowKey';

describe('isArrowKey', () => {
  it('arrow up key', () => {
    expect(isArrowKey(ARROW_UP)).toBe(true);
  });

  it('arrow right key', () => {
    expect(isArrowKey(ARROW_RIGHT)).toBe(true);
  });

  it('arrow down key', () => {
    expect(isArrowKey(ARROW_DOWN)).toBe(true);
  });

  it('arrow left key', () => {
    expect(isArrowKey(ARROW_LEFT)).toBe(true);
  });

  it('other keys', () => {
    expect(isArrowKey(13)).toBe(false);
    expect(isArrowKey(36)).toBe(false);
    expect(isArrowKey(41)).toBe(false);
    expect(isArrowKey(132)).toBe(false);
  });
});
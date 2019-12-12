import randomWithin from '../../src/utils/randomWithin';

describe('randomWithin', () => {
  [
    [0, 1],
    [40, 760],
    [-100, -50],
  ].forEach(([min, max]) => {
    it(`produces value within range: (${min}, ${max})`, () => {
      const result = randomWithin(min, max);
      expect(result).toBeLessThanOrEqual(max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(Number.isInteger(result)).toBe(true);
    });
  });
})
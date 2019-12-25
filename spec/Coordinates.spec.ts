import Coordinates from '../src/utils/Coordinates';

describe('Coordinates', () => {
  describe('equal()', () => {
    const testCases = [
      {
        title: 'true if both x and y match',
        aCoordinates: new Coordinates(5, 0),
        other: new Coordinates(5, 0),
        expectedResult: true,
      },
      {
        title: 'false if x does not match',
        aCoordinates: new Coordinates(5, 0),
        other: new Coordinates(10, 0),
        expectedResult: false,
      },
      {
        title: 'false if y does not match',
        aCoordinates: new Coordinates(5, 0),
        other: new Coordinates(5, 5),
        expectedResult: false,
      },
    ];
    testCases.forEach(t => it(t.title, () => {
      expect(t.aCoordinates.equal(t.other)).toBe(t.expectedResult);
    }));
  });

  describe('equalPartially()', () => {
    const testCases = [
      {
        title: 'true if x matches',
        aCoordinates: new Coordinates(5, 0),
        other: new Coordinates(5, 10),
        expectedResult: true,
      },
      {
        title: 'true if y matches',
        aCoordinates: new Coordinates(5, 0),
        other: new Coordinates(0, 0),
        expectedResult: true,
      },
      {
        title: 'false if both x and y do not match',
        aCoordinates: new Coordinates(0, 0),
        other: new Coordinates(5, 10),
        expectedResult: false,
      }
    ];
    testCases.forEach(t => it(t.title, () => {
      expect(t.aCoordinates.equalPartially(t.other)).toBe(t.expectedResult);
    }));
  });
});
import Coordinates from '../src/Coordinates';

describe('Coordinates', () => {
  describe('equals', () => {
    [
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
    ].forEach(testCase => it(testCase.title, () => {
      expect(
        testCase.aCoordinates.equals(testCase.other)
      ).toBe(testCase.expectedResult);
    }));
  });
});
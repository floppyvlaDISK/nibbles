import Snake from "../src/Snake";

describe('Snake', () => {
  describe('move()', () => {
    const testCases = [
      {
        title: 'decreases y coordinate if direction is up',
        direction: Snake.DIRECTION_UP,
        expectedY: 60,
        expectedX: 100,
      },
      {
        title: 'increases x coordinate if direction is right',
        direction: Snake.DIRECTION_RIGHT,
        expectedY: 100,
        expectedX: 140,
      },
      {
        title: 'increases y coordinate if direction is down',
        direction: Snake.DIRECTION_DOWN,
        expectedY: 140,
        expectedX: 100,
      },
      {
        title: 'descreases x coordinate if direction is left',
        direction: Snake.DIRECTION_LEFT,
        expectedY: 100,
        expectedX: 60,
      }
    ];
    testCases.forEach(testCase => {
      it(testCase.title, () => {
        const aSnake = new Snake(100, 100, 40, 40, 'red', testCase.direction);

        aSnake.move();

        expect(aSnake.y).toBe(testCase.expectedY);
        expect(aSnake.x).toBe(testCase.expectedX);
      });
    });
  });
});
import Snake from "../src/Snake";
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from "../src/utils/isArrowKey";

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

    it('throws an error if direction has unknown value', () => {
      const aSnake = new Snake(100, 100, 40, 40, 'red', 'up-right');
      const fn = () => aSnake.move();

      expect(fn).toThrow();
    });
  });

  describe('setDirectionFromKeyCode()', () => {
    const testCases = [
      {
        title: 'sets direction up on arrow up key',
        keyCode: ARROW_UP,
        expectedDirection: Snake.DIRECTION_UP,
      },
      {
        title: 'sets direction right on arrow right key',
        keyCode: ARROW_RIGHT,
        expectedDirection: Snake.DIRECTION_RIGHT,
      },
      {
        title: 'sets direction down on arrow down key',
        keyCode: ARROW_DOWN,
        expectedDirection: Snake.DIRECTION_DOWN,
      },
      {
        title: 'sets direction left on arrow left key',
        keyCode: ARROW_LEFT,
        expectedDirection: Snake.DIRECTION_LEFT,
      },
    ];
    testCases.forEach(testCase => {
      it(testCase.title, () => {
        const aSnake = new Snake(100, 100, 40, 40, 'red', Snake.DIRECTION_DOWN);

        aSnake.setDirectionFromKeyCode(testCase.keyCode);

        expect(aSnake.direction).toBe(testCase.expectedDirection);
      });
    });
  });
});
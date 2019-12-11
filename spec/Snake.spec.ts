import Snake from '../src/Snake';
import Target from '../src/Target';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from '../src/utils/isArrowKey';
import { CELL_WIDTH, CELL_HEIGHT } from '../src/CONST';

describe('Snake', () => {
  describe('move()', () => {
    const testCases = [
      {
        title: 'decreases y coordinate if direction is up',
        direction: Snake.DIRECTION_UP,
        expectedY: 2,
        expectedX: 3,
      },
      {
        title: 'increases x coordinate if direction is right',
        direction: Snake.DIRECTION_RIGHT,
        expectedY: 3,
        expectedX: 4,
      },
      {
        title: 'increases y coordinate if direction is down',
        direction: Snake.DIRECTION_DOWN,
        expectedY: 4,
        expectedX: 3,
      },
      {
        title: 'descreases x coordinate if direction is left',
        direction: Snake.DIRECTION_LEFT,
        expectedY: 3,
        expectedX: 2,
      }
    ];
    testCases.forEach(testCase => {
      it(testCase.title, () => {
        const aSnake = new Snake(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red', testCase.direction, 0);

        aSnake.move();

        expect(aSnake.y).toBe(testCase.expectedY);
        expect(aSnake.x).toBe(testCase.expectedX);
      });
    });

    it('throws an error if direction has unknown value', () => {
      const aSnake = new Snake(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red', 'up-right', 0);
      const fn = () => aSnake.move();

      expect(fn).toThrow();
    });
  });

  describe('directionFromKeyCode()', () => {
    const testCases = [
      {
        title: 'direction up on arrow up key',
        keyCode: ARROW_UP,
        expectedDirection: Snake.DIRECTION_UP,
      },
      {
        title: 'direction right on arrow right key',
        keyCode: ARROW_RIGHT,
        expectedDirection: Snake.DIRECTION_RIGHT,
      },
      {
        title: 'direction down on arrow down key',
        keyCode: ARROW_DOWN,
        expectedDirection: Snake.DIRECTION_DOWN,
      },
      {
        title: 'direction left on arrow left key',
        keyCode: ARROW_LEFT,
        expectedDirection: Snake.DIRECTION_LEFT,
      },
    ];
    testCases.forEach(t => it(t.title, () => {
      expect(Snake.directionFromKeyCode(t.keyCode)).toBe(t.expectedDirection);
    }));

    it('throws an error if keyCode is has unknown value', () => {
      const fn = () => Snake.directionFromKeyCode(122);

      expect(fn).toThrow();
    });
  });

  it('eat()', () => {
    const aSnake = new Snake(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red', Snake.DIRECTION_RIGHT, 10);
    const aTarget = new Target(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue', 13);

    expect(aSnake.score).toBe(10);

    aSnake.eat(aTarget);

    expect(aSnake.score).toBe(23);
  });

  describe('canEat()', () => {
    const testCases = [
      {
        title: 'true if snake coordinates contain target coordinates',
        aSnake: new Snake(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red', Snake.DIRECTION_RIGHT, 10),
        aTarget: new Target(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue', 13),
        expectedResult: true,
      },
      {
        title: 'false if snake coordinates do not contain target coordinates',
        aSnake: new Snake(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red', Snake.DIRECTION_RIGHT, 10),
        aTarget: new Target(4, 4, CELL_WIDTH, CELL_HEIGHT, 'blue', 13),
        expectedResult: false,
      }
    ];
    testCases.forEach(t => it(t.title, () => {
      expect(t.aSnake.canEat(t.aTarget)).toBe(t.expectedResult);
    }));
  });

  describe('die()', () => {
    it('sets coordinates to initial', () => {
      const aSnake = new Snake(3, 4, CELL_WIDTH, CELL_HEIGHT, 'red', Snake.DIRECTION_RIGHT, 10);

      for (let i = 0; i < 3; i++) {
        aSnake.move();
      }
      aSnake.die();

      expect(aSnake.x).toBe(3);
      expect(aSnake.y).toBe(4);
    });

    xit('sets score to initial', () => {

    });
  });
});
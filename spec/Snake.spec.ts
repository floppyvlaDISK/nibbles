import Snake from '../src/Snake';
import Target from '../src/Target';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT } from '../src/utils/isArrowKey';
import { CELL_WIDTH, CELL_HEIGHT } from '../src/CONST';
import BoardObject from '../src/BoardObject';

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
      it(`head - ${testCase.title}`, () => {
        const aSnake = new Snake(
          new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
          testCase.direction,
          0
        );

        aSnake.move();

        expect(aSnake.body.head.y).toBe(testCase.expectedY);
        expect(aSnake.body.head.x).toBe(testCase.expectedX);
      });

      it(`rest of body - ${testCase.title}`, () => {
        const aSnake = new Snake(
          new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
          testCase.direction,
          0,
        );
        const aTarget = new Target(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue', 25);

        aSnake.eat(aTarget);
        aSnake.move();

        expect(aSnake.body.tail.x).toBe(3);
        expect(aSnake.body.tail.y).toBe(3);

        aSnake.move();

        expect(aSnake.body.tail.x).toBe(testCase.expectedX);
        expect(aSnake.body.tail.y).toBe(testCase.expectedY);
      });
    });

    it('throws an error if direction has unknown value', () => {
      const aSnake = new Snake(new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'), 'up-right', 0);
      const fn = () => aSnake.move();

      expect(fn).toThrow();
    });
  });

  describe('direction setter', () => {
    const testCases = [
      {
        title: 'cannot set direction to right if current direction was left',
        prevDirection: Snake.DIRECTION_LEFT,
        nextDirection: Snake.DIRECTION_RIGHT,
      },
      {
        title: 'cannot set direction to left if current direction was right',
        prevDirection: Snake.DIRECTION_RIGHT,
        nextDirection: Snake.DIRECTION_LEFT,
      },
      {
        title: 'cannot set direction to up if current direction is down',
        prevDirection: Snake.DIRECTION_DOWN,
        nextDirection: Snake.DIRECTION_UP,
      },
      {
        title: 'cannot set direction to down if current direction is up',
        prevDirection: Snake.DIRECTION_UP,
        nextDirection: Snake.DIRECTION_DOWN,
      }
    ];
    testCases.forEach(t => it(t.title, () => {
      const aSnake = new Snake(
        new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
        t.prevDirection,
        0,
      );

      aSnake.direction = t.nextDirection;

      expect(aSnake.direction).toBe(t.prevDirection);
    }));
  })

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

  describe('eat()', () => {
    it('increases the score by target\'s value', () => {
      const aSnake = new Snake(
        new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
        Snake.DIRECTION_RIGHT,
        10
      );
      const aTarget = new Target(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue', 13);

      expect(aSnake.score).toBe(10);

      aSnake.eat(aTarget);

      expect(aSnake.score).toBe(23);
    });

    it('grows new body part', () => {
      const aSnake = new Snake(
        new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
        Snake.DIRECTION_RIGHT,
        10
      );
      const aTarget = new Target(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue', 13);

      expect(aSnake.body.length).toBe(1);

      aSnake.eat(aTarget);

      expect(aSnake.body.length).toBe(2);
    });
  });

  describe('canEat()', () => {
    const testCases = [
      {
        title: 'true if snake coordinates contain target coordinates',
        aSnake: new Snake(new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'), Snake.DIRECTION_RIGHT, 10),
        aTarget: new Target(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue', 13),
        expectedResult: true,
      },
      {
        title: 'false if snake coordinates do not contain target coordinates',
        aSnake: new Snake(new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'), Snake.DIRECTION_RIGHT, 10),
        aTarget: new Target(4, 4, CELL_WIDTH, CELL_HEIGHT, 'blue', 13),
        expectedResult: false,
      }
    ];
    testCases.forEach(t => it(t.title, () => {
      expect(t.aSnake.canEat(t.aTarget)).toBe(t.expectedResult);
    }));
  });

  describe('hasEatenItself()', () => {
    const testCases = [
      {
        title: 'true if some of snake\'s body part has the same coordinate as head',
        head: new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
        direction: Snake.DIRECTION_DOWN,
        bodyParts: [
          new BoardObject(4, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
          new BoardObject(4, 4, CELL_WIDTH, CELL_HEIGHT, 'red'),
          new BoardObject(3, 4, CELL_WIDTH, CELL_HEIGHT, 'red'),
          new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'red'),
        ],
        expectedResult: true,
      },
      {
        title: 'false otherwise',
        head: new BoardObject(5, 5, CELL_WIDTH, CELL_HEIGHT, 'red'),
        direction: Snake.DIRECTION_RIGHT,
        bodyParts: [
          new BoardObject(4, 5, CELL_WIDTH, CELL_HEIGHT, 'red'),
          new BoardObject(3, 5, CELL_WIDTH, CELL_HEIGHT, 'red'),
          new BoardObject(2, 5, CELL_WIDTH, CELL_HEIGHT, 'red'),
        ],
        expectedResult: false,
      },
    ];
    testCases.forEach(t => it(t.title, () => {
      const aSnake = new Snake(t.head, t.direction, 0);
      for (let bodyPart of t.bodyParts) {
        aSnake.body.insert(bodyPart);
      }

      expect(aSnake.hasEatenItself()).toBe(t.expectedResult);
    }));

    xit('handles case when snake has just eaten a target and grown a body part', () => {

    });
  });

  describe('die()', () => {
    it('sets coordinates to initial', () => {
      const initialX = 3;
      const initialY = 4
      const aSnake = new Snake(new BoardObject(initialX, initialY, CELL_WIDTH, CELL_HEIGHT, 'red'), Snake.DIRECTION_RIGHT, 10);

      for (let i = 0; i < 3; i++) {
        aSnake.move();
      }
      aSnake.die();

      expect(aSnake.body.head.x).toBe(initialX);
      expect(aSnake.body.head.y).toBe(initialY);
    });

    it('sets score to initial', () => {
      const initialScore = 10;
      const aSnake = new Snake(new BoardObject(3, 4, CELL_WIDTH, CELL_HEIGHT, 'red'), Snake.DIRECTION_RIGHT, initialScore);
      const aTarget = new Target(3, 4, CELL_WIDTH, CELL_HEIGHT, 'red', 13);

      aSnake.eat(aTarget);
      aSnake.die();

      expect(aSnake.score).toBe(initialScore);
    });

    it('sets direction to initial', () => {
      const initialDirection = Snake.DIRECTION_RIGHT;
      const aSnake = new Snake(new BoardObject(3, 4, CELL_WIDTH, CELL_HEIGHT, 'red'), initialDirection, 10);

      aSnake.direction = Snake.DIRECTION_DOWN;
      aSnake.die();

      expect(aSnake.direction).toBe(initialDirection);
    });
  });
});
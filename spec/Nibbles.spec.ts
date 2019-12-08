import { ARROW_UP } from '../src/utils/isArrowKey';
import Nibbles from '../src/Nibbles';
import Snake from '../src/Snake';
import Target from '../src/Target';
import Renderer from '../src/Renderer';

describe('Nibbles', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  it('render()', () => {
    const { aNibbles, rendererMock } = setup();

    aNibbles.render();

    testRenderCalls(rendererMock, 1);
  });

  describe('start()', () => {
    it('renders board and objects', () => {
      const { aNibbles, rendererMock } = setup();

      aNibbles.start();

      testRenderCalls(rendererMock, 1);

      jasmine.clock().tick(750 * 4);

      testRenderCalls(rendererMock, 5);
    });

    it('moves the snake', () => {
      const { aNibbles, snakeMock } = setup();

      expect(snakeMock.move).toHaveBeenCalledTimes(0);

      aNibbles.start();

      expect(snakeMock.move).toHaveBeenCalledTimes(1);

      jasmine.clock().tick(750);

      expect(snakeMock.move).toHaveBeenCalledTimes(2);
    });


    it('makes the snake eat the target if their positions on board intersects after snake move', () => {
      const { aNibbles, snakeMock } = setup({ canEat: true });

      expect(snakeMock.canEat).toHaveBeenCalledTimes(0);
      expect(snakeMock.eat).toHaveBeenCalledTimes(0);

      aNibbles.start();

      expect(snakeMock.canEat).toHaveBeenCalledTimes(1);
      expect(snakeMock.eat).toHaveBeenCalledTimes(1);

      jasmine.clock().tick(750);

      expect(snakeMock.canEat).toHaveBeenCalledTimes(2);
      expect(snakeMock.eat).toHaveBeenCalledTimes(2);
    });
  });

  describe('setSnakeDirectionFromKeyCode()', () => {
    it('queues snake direction change to be set on performing update', () => {
      const { aNibbles, snakeMock } = setup();

      expect(snakeMock.direction).toBe(Snake.DIRECTION_RIGHT);

      aNibbles.setSnakeDirectionFromKeyCode(ARROW_UP);
      aNibbles.start();
      jasmine.clock().tick(750);

      expect(snakeMock.direction).toBe(Snake.DIRECTION_UP);
    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function setup({ canEat = false } = {}) {
    const rendererMock = createRendererMock();
    const snakeMock = createSnakeMock({ canEat });
    return {
      rendererMock,
      snakeMock,
      aNibbles: setupNibbles(rendererMock, snakeMock),
    };
  }
  function setupNibbles(
    rendererMock: jasmine.SpyObj<Renderer>,
    snakeMock: jasmine.SpyObj<Snake>,
  ) {
    return new Nibbles(
      rendererMock,
      snakeMock,
      new Target(0, 0, 0, 0, 'red', 10),
      []
    );
  }
  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['renderBoard', 'renderBoardObject'],
    );
  }
  function createSnakeMock({ canEat = false } = {}) {
    const result = jasmine.createSpyObj(
      'Snake',
      {
        move: undefined,
        eat: undefined,
        canEat,
      },
    );
    result.direction = Snake.DIRECTION_RIGHT;
    return result;
  }
  function testRenderCalls(
    rendererMock: jasmine.SpyObj<Renderer>,
    callCount: number
  ) {
    expect(rendererMock.renderBoard).toHaveBeenCalledTimes(callCount);
    expect(rendererMock.renderBoardObject).toHaveBeenCalledTimes(callCount * 2);
  }
});
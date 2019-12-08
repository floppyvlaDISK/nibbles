import sinon from 'sinon';

import { ARROW_UP } from '../src/utils/isArrowKey';
import Nibbles from '../src/Nibbles';
import Snake from '../src/Snake';
import Target from '../src/Target';
import Renderer from '../src/Renderer';
import * as randomWithin from '../src/utils/randomWithin';
import Coordinates from '../src/Coordinates';

describe('Nibbles', () => {
  let sandbox = sinon.createSandbox();

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

    it('re-positions the target if it\'s eaten by snake', () => {
      const { aNibbles, targetMock } = setup({ canEat: true });
      const nextX = 120;
      const nextY = 160;
      const randomWithinStub = sandbox.stub(randomWithin, 'default')
        .onCall(0)
        .returns(nextX)
        .onCall(1)
        .returns(nextY);

      aNibbles.start();

      expect(targetMock.x).toBe(nextX);
      expect(targetMock.y).toBe(nextY);
      expect(randomWithinStub.callCount).toBe(2);
    });

    it('does not overlap target with the snake on re-positioning', () => {
      const badNextX = 120;
      const badNextY = 160;
      const goodNextX = 200;
      const goodNextY = 240;
      const { aNibbles, targetMock } = setup({
        canEat: true,
        snakeX: badNextX,
        snakeY: badNextY,
      });
      const randomWithinStub = sandbox.stub(randomWithin, 'default')
        .onCall(0)
        .returns(badNextX)
        .onCall(1)
        .returns(badNextY)
        .onCall(2)
        .returns(goodNextX)
        .onCall(3)
        .returns(goodNextY);

      aNibbles.start();

      expect(targetMock.x).toBe(goodNextX);
      expect(targetMock.y).toBe(goodNextY);
      expect(randomWithinStub.callCount).toBe(4);
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
    sandbox.restore();
  });

  function setup({ canEat = false, snakeX = 0, snakeY = 0 } = {}) {
    const rendererMock = createRendererMock();
    const snakeMock = createSnakeMock({ canEat, snakeX, snakeY });
    const targetMock = createTargetMock();
    return {
      rendererMock,
      snakeMock,
      targetMock,
      aNibbles: setupNibbles(rendererMock, snakeMock, targetMock),
    };
  }
  function setupNibbles(
    rendererMock: jasmine.SpyObj<Renderer>,
    snakeMock: jasmine.SpyObj<Snake>,
    targetMock: jasmine.SpyObj<Target>,
  ) {
    return new Nibbles(
      rendererMock,
      snakeMock,
      targetMock,
      [],
    );
  }
  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['renderBoard', 'renderBoardObject'],
    );
  }
  function createSnakeMock({
    canEat = false,
    snakeX = 0,
    snakeY = 0,
  } = {}) {
    const result = jasmine.createSpyObj(
      'Snake',
      {
        move: undefined,
        eat: undefined,
        canEat,
      },
    );
    result.direction = Snake.DIRECTION_RIGHT;
    result.coordinates = new Coordinates(snakeX, snakeY);
    return result;
  }
  function createTargetMock() {
    const result = jasmine.createSpyObj(
      'Target',
      { value: 25 },
    );
    result.x = 80;
    result.y = 80;
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
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

      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS * 4);

      testRenderCalls(rendererMock, 5);
    });

    it('moves the snake', () => {
      const { aNibbles, snakeMock } = setup();

      expect(snakeMock.move).toHaveBeenCalledTimes(0);

      aNibbles.start();

      expect(snakeMock.move).toHaveBeenCalledTimes(1);

      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS);

      expect(snakeMock.move).toHaveBeenCalledTimes(2);
    });


    it('makes the snake eat the target if their positions on board intersects after snake move', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: { canEat: true }
      });

      expect(snakeMock.canEat).toHaveBeenCalledTimes(0);
      expect(snakeMock.eat).toHaveBeenCalledTimes(0);

      aNibbles.start();

      expect(snakeMock.canEat).toHaveBeenCalledTimes(1);
      expect(snakeMock.eat).toHaveBeenCalledTimes(1);

      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS);

      expect(snakeMock.canEat).toHaveBeenCalledTimes(2);
      expect(snakeMock.eat).toHaveBeenCalledTimes(2);
    });

    it('spawns target if it\'s eaten by snake', () => {
      const nextX = 3;
      const nextY = 4;
      const { aNibbles, targetMock } = setup({
        snakeMockData: { canEat: true },
      });
      const randomWithinStub = stubRandomWithin([nextX, nextY]);

      aNibbles.start();

      expect(targetMock.x).toBe(nextX);
      expect(targetMock.y).toBe(nextY);
      expect(randomWithinStub.callCount).toBe(2);
    });

    it('does not spawn target on the wall', () => {
      const nextX = 3;
      const nextY = 4;
      const { aNibbles } = setup({
        snakeMockData: { canEat: true },
      });
      const randomWithinStub = stubRandomWithin([nextX, nextY]);

      aNibbles.start();

      expect(randomWithinStub.getCall(0).args).toEqual([1, 18]);
      expect(randomWithinStub.getCall(1).args).toEqual([1, 18]);
    });

    it('does not overlap target with snake on target re-positioning', () => {
      const snakeX = 3;
      const snakeY = 4;
      const nextX = 5;
      const nextY = 6;
      const { aNibbles, targetMock } = setup({
        snakeMockData: { canEat: true, x: snakeX, y: snakeY },
      });
      const randomWithinStub = stubRandomWithin([
        snakeX, snakeY, nextX, nextY
      ]);

      aNibbles.start();

      expect(targetMock.x).toBe(nextX);
      expect(targetMock.y).toBe(nextY);
      expect(randomWithinStub.callCount).toBe(4);
    });

    it('does not spawn target to same coordinate it was before', () => {
      const targetX = 3;
      const targetY = 4;
      const nextX = 5;
      const nextY = 6;
      const { aNibbles, targetMock } = setup({
        snakeMockData: { canEat: true },
        targetMockData: { x: targetX, y: targetY },
      });
      const randomWithinStub = stubRandomWithin([
        targetX, targetY, nextX, nextY
      ]);

      aNibbles.start();

      expect(targetMock.x).toBe(nextX);
      expect(targetMock.y).toBe(nextY);
      expect(randomWithinStub.callCount).toBe(4);
    });
  });

  describe('setSnakeDirectionFromKeyCode()', () => {
    it('queues snake direction change to be set on performing update', () => {
      const { aNibbles, snakeMock } = setup();

      expect(snakeMock.direction).toBe(Snake.DIRECTION_RIGHT);

      aNibbles.setSnakeDirectionFromKeyCode(ARROW_UP);
      aNibbles.start();
      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS);

      expect(snakeMock.direction).toBe(Snake.DIRECTION_UP);
    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    sandbox.restore();
  });

  function setup({
    snakeMockData = {},
    targetMockData = {}
  } = {}) {
    const rendererMock = createRendererMock();
    const snakeMock = createSnakeMock(snakeMockData);
    const targetMock = createTargetMock(targetMockData);
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
    x = 0,
    y = 0,
  }: {
    canEat?: boolean,
    x?: number,
    y?: number
  }) {
    const result = jasmine.createSpyObj(
      'Snake',
      {
        move: undefined,
        eat: undefined,
        canEat,
      },
    );
    result.direction = Snake.DIRECTION_RIGHT;
    result.coordinates = new Coordinates(x, y);
    return result;
  }
  function createTargetMock({
    x = 4,
    y = 4,
    value = 25,
  }: {
    x?: number,
    y?: number,
    value?: number
  }) {
    const result = jasmine.createSpyObj(
      'Target',
      { value: value },
    );
    result.coordinates = new Coordinates(x, y);
    result.x = x;
    result.y = y;
    return result;
  }
  function testRenderCalls(
    rendererMock: jasmine.SpyObj<Renderer>,
    callCount: number
  ) {
    expect(rendererMock.renderBoard).toHaveBeenCalledTimes(callCount);
    expect(rendererMock.renderBoardObject).toHaveBeenCalledTimes(callCount * 2);
  }
  function stubRandomWithin(argsList: Array<number>) {
    const stub = sandbox.stub(randomWithin, 'default')
    argsList.forEach((arg, index) => {
      stub.onCall(index).returns(arg);
    });
    return stub;
  }
});
import sinon from 'sinon';

import { ARROW_UP } from '../src/utils/isArrowKey';
import Nibbles from '../src/Nibbles';
import Snake from '../src/Snake';
import Target from '../src/Target';
import Renderer from '../src/Renderer';
import * as randomWithin from '../src/utils/randomWithin';
import Coordinates from '../src/Coordinates';
import BoardObject from '../src/BoardObject';
import {
  BOARD_WIDTH,
  CELL_HEIGHT,
  BOARD_HEIGHT,
  CELL_WIDTH,
  LAST_CELL_INDEX_BY_HEIGHT,
  LAST_CELL_INDEX_BY_WIDTH
} from '../src/CONST';
import PubSub from '../src/utils/PubSub';

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

  describe('game loop', () => {
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

    it('does not overlap target with snake on target spawning', () => {
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

    it('checks if snake will die from wall collision', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: { x: 5, y: 0, direction: Snake.DIRECTION_LEFT },
      });

      aNibbles.start();

      expect(snakeMock.die).toHaveBeenCalledTimes(1);
    });

    it('cancels following updates if snake has died', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: { x: 5, y: 0, direction: Snake.DIRECTION_LEFT },
      });

      aNibbles.start();
      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS * 5);

      expect(snakeMock.move).toHaveBeenCalledTimes(2); // FIXME: Why not 1?
    });

    it('publishes "SnakeScoreChanged" event after snake has eaten the target', () => {
      const { aNibbles, pubSubMock } = setup({
        snakeMockData: { canEat: true, score: 25 },
      });

      aNibbles.start();

      expect(pubSubMock.publish).toHaveBeenCalledTimes(1);
      expect(pubSubMock.publish).toHaveBeenCalledWith('SnakeScoreChanged', 25);
    });

    it('publishes "SnakeScoreChanged" event after snakes has died', () => {
      const { aNibbles, pubSubMock } = setup({
        snakeMockData: { x: 5, y: 0, direction: Snake.DIRECTION_LEFT, score: 0 },
      });

      aNibbles.start();

      expect(pubSubMock.publish).toHaveBeenCalledTimes(1);
      expect(pubSubMock.publish).toHaveBeenCalledWith('SnakeScoreChanged', 0);
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
    const pubSubMock = createPubSubMock();
    return {
      rendererMock,
      snakeMock,
      targetMock,
      pubSubMock,
      aNibbles: setupNibbles(rendererMock, snakeMock, targetMock, pubSubMock),
    };
  }
  function setupNibbles(
    rendererMock: jasmine.SpyObj<Renderer>,
    snakeMock: jasmine.SpyObj<Snake>,
    targetMock: jasmine.SpyObj<Target>,
    pubSubMock: jasmine.SpyObj<PubSub>,
  ) {
    return new Nibbles(
      rendererMock,
      new BoardObject(0, 0, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
      snakeMock,
      targetMock,
      [
        new BoardObject(0, 0, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
        new BoardObject(0, LAST_CELL_INDEX_BY_HEIGHT, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
        new BoardObject(LAST_CELL_INDEX_BY_WIDTH, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
        new BoardObject(0, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
      ],
      pubSubMock,
    );
  }
  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['render'],
    );
  }
  function createSnakeMock({
    canEat = false,
    x = 1,
    y = 1,
    direction = Snake.DIRECTION_RIGHT,
    score = 25,
  }: {
    canEat?: boolean,
    x?: number,
    y?: number,
    direction?: string,
    score?: number,
  }) {
    const result = jasmine.createSpyObj(
      'Snake',
      {
        move: undefined,
        die: undefined,
        eat: undefined,
        canEat,
      },
    );
    result.score = score;
    result.direction = direction;
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
  function createPubSubMock() {
    return jasmine.createSpyObj(
      'pubSub',
      ['publish']
    );
  }
  function testRenderCalls(
    rendererMock: jasmine.SpyObj<Renderer>,
    callCount: number
  ) {
    expect(rendererMock.render).toHaveBeenCalledTimes(callCount * 7);
  }
  function stubRandomWithin(argsList: Array<number>) {
    const stub = sandbox.stub(randomWithin, 'default')
    argsList.forEach((arg, index) => {
      stub.onCall(index).returns(arg);
    });
    return stub;
  }
});
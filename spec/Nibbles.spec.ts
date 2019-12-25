import sinon from 'sinon';

import { ARROW_UP } from '../src/utils/isArrowKey';
import Nibbles from '../src/Nibbles';
import Snake from '../src/Snake';
import Target from '../src/Target';
import Renderer from '../src/Renderer';
import * as randomWithin from '../src/utils/randomWithin';
import BoardObject from '../src/BoardObject';
import {
  BOARD_WIDTH as B_W,
  BOARD_HEIGHT as B_H,
  CELL_HEIGHT as C_H,
  CELL_WIDTH as C_W,
  LAST_CELL_INDEX_BY_HEIGHT,
  LAST_CELL_INDEX_BY_WIDTH
} from '../src/constants/common';
import PubSub from '../src/utils/PubSub';
import TargetRenderer from '../src/TargetRenderer';
import { flushPromise, loadSnakeSprite } from './support/helpers/testingUtils';
import SnakeRenderer from '../src/SnakeRenderer';
import BoardColoredObject from '../src/BoardColoredObject';

describe('Nibbles', () => {
  let sandbox = sinon.createSandbox();

  beforeEach(() => {
    jasmine.clock().install();
  });

  it('render()', async () => {
    const { aNibbles, rendererMock } = setup();

    aNibbles.render();
    await loadSnakeSprite();

    testRenderCalls(rendererMock, 1);
  });

  describe('game loop', () => {
    it('renders board and objects', async () => {
      const { aNibbles, rendererMock } = setup();

      aNibbles.start();
      await loadSnakeSprite();

      testRenderCalls(rendererMock, 1);

      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS * 4);
      await flushPromise();

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

    it('makes the snake eat the target if their positions on board intersect after snake move', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT },
        targetMockData: { x: 2, y: 1 },
      });

      expect(snakeMock.canEat).toHaveBeenCalledTimes(0);
      expect(snakeMock.eat).toHaveBeenCalledTimes(0);

      aNibbles.start();

      expect(snakeMock.canEat).toHaveBeenCalledTimes(1);
      expect(snakeMock.eat).toHaveBeenCalledTimes(1);
    });

    it('spawns target if it\'s eaten by snake', () => {
      const nextX = 3;
      const nextY = 4;
      const { aNibbles, targetMock } = setup({
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT
        },
        targetMockData: { x: 2, y: 1 },
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
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT,
        },
        targetMockData: { x: 2, y: 1 },
      });
      const randomWithinStub = stubRandomWithin([nextX, nextY]);

      aNibbles.start();

      expect(randomWithinStub.getCall(0).args).toEqual([1, 18]);
      expect(randomWithinStub.getCall(1).args).toEqual([1, 18]);
    });

    it('does not overlap target with snake on target spawning', () => {
      const snakeX1 = 3;
      const snakeY1 = 1;
      const snakeX2 = 2;
      const snakeY2 = 1;
      const nextX = 5;
      const nextY = 6;
      const { aNibbles, targetMock } = setup({
        snakeMockData: {
          body: [
            new BoardObject(3, 1),
            new BoardObject(2, 1),
            new BoardObject(1, 1),
          ],
          direction: Snake.DIRECTION_RIGHT
        },
        targetMockData: { x: 4, y: 1 },
      });
      const randomWithinStub = stubRandomWithin([
        snakeX1, snakeY1,
        snakeX2, snakeY2,
        nextX, nextY,
      ]);

      aNibbles.start();

      expect(targetMock.x).toBe(nextX);
      expect(targetMock.y).toBe(nextY);
      expect(randomWithinStub.callCount).toBe(6);
    });

    it('does not spawn target to same coordinate it was before', () => {
      const targetX = 2;
      const targetY = 1;
      const nextX = 5;
      const nextY = 6;
      const { aNibbles, targetMock } = setup({
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT
        },
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

    it('checks if snake should die because of collision with the wall', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 1)],
          direction: Snake.DIRECTION_UP
        },
      });

      aNibbles.start();

      expect(snakeMock.die).toHaveBeenCalledTimes(1);
    });

    it('checks if snake should die because of eating itself', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: {
          body: [
            new BoardObject(3, 3),
            new BoardObject(4, 3),
            new BoardObject(4, 4),
            new BoardObject(3, 4),
            new BoardObject(2, 4),
          ],
          direction: Snake.DIRECTION_DOWN,
        },
      });

      aNibbles.start();

      expect(snakeMock.die).toHaveBeenCalledTimes(1);
    });

    it('cancels following updates if snake has died', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 1)],
          direction: Snake.DIRECTION_UP
        },
      });

      aNibbles.start();
      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS * 5);

      expect(snakeMock.move).toHaveBeenCalledTimes(2); // FIXME: Why not 1?
    });

    it('publishes "SnakeScoreChanged" event after snake has eaten the target', () => {
      const { aNibbles, pubSubMock } = setup({
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT, score: 0
        },
        targetMockData: { x: 2, y: 1, score: 25 },
      });

      aNibbles.start();

      expect(pubSubMock.publish).toHaveBeenCalledTimes(1);
      expect(pubSubMock.publish).toHaveBeenCalledWith('SnakeScoreChanged', 25);
    });

    it('publishes "SnakeScoreChanged" event after snakes has died', () => {
      const { aNibbles, pubSubMock } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 1)],
          direction: Snake.DIRECTION_UP, score: 10
        },
      });

      aNibbles.start();

      expect(pubSubMock.publish).toHaveBeenCalledTimes(1);
      expect(pubSubMock.publish).toHaveBeenCalledWith('SnakeScoreChanged', 10);
    });
  });

  describe('setSnakeDirectionFromKeyCode()', () => {
    it('queues snake direction change to be set when performing update', () => {
      const { aNibbles, snakeMock } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 5)],
          direction: Snake.DIRECTION_RIGHT
        }
      });

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
      aNibbles: setupNibbles(
        rendererMock,
        snakeMock,
        targetMock,
        pubSubMock
      ),
    };
  }
  // FIXME: Put createMock functions into some util file?
  function setupNibbles(
    rendererMock: jasmine.SpyObj<Renderer>,
    snakeMock: Snake,
    targetMock: Target,
    pubSubMock: PubSub,
  ) {
    return new Nibbles(
      rendererMock,
      new BoardColoredObject(0, 0, B_W, C_H, 'pink'),
      snakeMock,
      targetMock,
      [
        new BoardColoredObject(0, 0, B_W, C_H, 'pink'),
        new BoardColoredObject(0, LAST_CELL_INDEX_BY_HEIGHT, B_W, C_H, 'pink'),
        new BoardColoredObject(LAST_CELL_INDEX_BY_WIDTH, 0, C_W, B_H, 'pink'),
        new BoardColoredObject(0, 0, C_W, B_H, 'pink'),
      ],
      pubSubMock,
      new TargetRenderer(rendererMock, targetMock),
      new SnakeRenderer(rendererMock, snakeMock),
    );
  }
  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['render', 'renderImage'],
    );
  }
  function createSnakeMock({
    body = [new BoardObject(1, 1)],
    direction = Snake.DIRECTION_RIGHT,
    score = 25,
  }: {
    body?: Array<BoardObject>,
    direction?: string,
    score?: number,
  }) {
    const result = new Snake(body, direction, score);
    spyOn(result, 'move').and.callThrough();
    spyOn(result, 'die').and.callThrough();
    spyOn(result, 'eat').and.callThrough();
    spyOn(result, 'canEat').and.callThrough();
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
    const result = new Target(x, y, C_W, C_H, value);
    spyOnProperty(result, 'value').and.callThrough();
    return result;
  }
  function createPubSubMock() {
    const result = new PubSub();
    spyOn(result, 'publish');
    return result;
  }
  function testRenderCalls(
    rendererMock: jasmine.SpyObj<Renderer>,
    callCount: number
  ) {
    expect(rendererMock.render).toHaveBeenCalledTimes(callCount * 5);
    expect(rendererMock.renderImage).toHaveBeenCalledTimes(callCount * 2);
  }
  function stubRandomWithin(argsList: Array<number>) {
    const stub = sandbox.stub(randomWithin, 'default')
    argsList.forEach((arg, index) => {
      stub.onCall(index).returns(arg);
    });
    return stub;
  }
});
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
import { createRendererMock } from './support/helpers/componentMocks';
import { createSnake  } from './support/helpers/testingUtils';
import {
  flushPromise,
  loadSnakeSprite,
} from './support/helpers/testingUtils';
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
      const { aNibbles, snakeMoveSpy } = setup();

      expect(snakeMoveSpy).toHaveBeenCalledTimes(0);

      aNibbles.start();

      expect(snakeMoveSpy).toHaveBeenCalledTimes(1);

      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS);

      expect(snakeMoveSpy).toHaveBeenCalledTimes(2);
    });

    it('makes the snake eat the target if their positions on board intersect after snake move', () => {
      const { aNibbles, snakeCanEatSpy, snakeEatSpy } = setup({
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT
        },
        targetMockData: { x: 2, y: 1 },
      });

      expect(snakeCanEatSpy).toHaveBeenCalledTimes(0);
      expect(snakeEatSpy).toHaveBeenCalledTimes(0);

      aNibbles.start();

      expect(snakeCanEatSpy).toHaveBeenCalledTimes(1);
      expect(snakeEatSpy).toHaveBeenCalledTimes(1);
    });

    it('spawns target if it\'s eaten by snake', () => {
      const nextX = 3;
      const nextY = 4;
      const { aNibbles, target } = setup({
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT
        },
        targetMockData: { x: 2, y: 1 },
      });
      const randomWithinStub = stubRandomWithin([nextX, nextY]);

      aNibbles.start();

      expect(target.x).toBe(nextX);
      expect(target.y).toBe(nextY);
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
      const { aNibbles, target } = setup({
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

      expect(target.x).toBe(nextX);
      expect(target.y).toBe(nextY);
      expect(randomWithinStub.callCount).toBe(6);
    });

    it('does not spawn target to same coordinate it was before', () => {
      const targetX = 2;
      const targetY = 1;
      const nextX = 5;
      const nextY = 6;
      const { aNibbles, target } = setup({
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

      expect(target.x).toBe(nextX);
      expect(target.y).toBe(nextY);
      expect(randomWithinStub.callCount).toBe(4);
    });

    it('checks if snake should die because of collision with the wall', () => {
      const { aNibbles, snakeDieSpy } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 1)],
          direction: Snake.DIRECTION_UP
        },
      });

      aNibbles.start();

      expect(snakeDieSpy).toHaveBeenCalledTimes(1);
    });

    it('checks if snake should die because of eating itself', () => {
      const { aNibbles, snakeDieSpy } = setup({
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

      expect(snakeDieSpy).toHaveBeenCalledTimes(1);
    });

    it('cancels following updates if snake has died', () => {
      const { aNibbles, snakeMoveSpy  } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 1)],
          direction: Snake.DIRECTION_UP
        },
      });

      aNibbles.start();
      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS * 5);

      expect(snakeMoveSpy).toHaveBeenCalledTimes(2); // FIXME: Why not 1?
    });

    it('publishes "SnakeScoreChanged" event after snake has eaten the target', () => {
      const { aNibbles, pubSubPublishSpy } = setup({
        snakeMockData: {
          body: [new BoardObject(1, 1)],
          direction: Snake.DIRECTION_RIGHT, score: 0
        },
        targetMockData: { x: 2, y: 1, score: 25 },
      });

      aNibbles.start();

      expect(pubSubPublishSpy).toHaveBeenCalledTimes(1);
      expect(pubSubPublishSpy).toHaveBeenCalledWith('SnakeScoreChanged', 25);
    });

    it('publishes "SnakeScoreChanged" and "SnakeDied" events after snakes has died', () => {
      const { aNibbles, pubSubPublishSpy } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 1)],
          direction: Snake.DIRECTION_UP, score: 10
        },
      });

      aNibbles.start();

      expect(pubSubPublishSpy).toHaveBeenCalledTimes(2);
      expect(pubSubPublishSpy.calls.argsFor(0)).toEqual(['SnakeDied', 10]);
      expect(pubSubPublishSpy.calls.argsFor(1)).toEqual(['SnakeScoreChanged', 10]);
    });
  });

  describe('setSnakeDirectionFromKeyCode()', () => {
    it('queues snake direction change to be set when performing update', () => {
      const { aNibbles, snake } = setup({
        snakeMockData: {
          body: [new BoardObject(5, 5)],
          direction: Snake.DIRECTION_RIGHT
        }
      });

      expect(snake.direction).toBe(Snake.DIRECTION_RIGHT);

      aNibbles.setSnakeDirectionFromKeyCode(ARROW_UP);
      aNibbles.start();
      jasmine.clock().tick(Nibbles.UPDATE_FREQUENCY_MS);

      expect(snake.direction).toBe(Snake.DIRECTION_UP);
    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    sandbox.restore();
  });

  function setup({
    snakeMockData = {},
    targetMockData = {},
  } = {}) {
    const rendererMock = createRendererMock();

    const snake = createSnake(snakeMockData);
    const snakeMoveSpy = spyOn(snake, 'move').and.callThrough();
    const snakeDieSpy = spyOn(snake, 'die').and.callThrough();
    const snakeEatSpy = spyOn(snake, 'eat').and.callThrough();
    const snakeCanEatSpy = spyOn(snake, 'canEat').and.callThrough();

    const target = createTarget(targetMockData);

    const pubSub = new PubSub();
    const pubSubPublishSpy = spyOn(pubSub, 'publish').and.callThrough();

    const aNibbles = new Nibbles(
      rendererMock,
      new BoardColoredObject(0, 0, B_W, C_H, 'pink'),
      snake,
      target,
      [
        new BoardColoredObject(0, 0, B_W, C_H, 'pink'),
        new BoardColoredObject(0, LAST_CELL_INDEX_BY_HEIGHT, B_W, C_H, 'pink'),
        new BoardColoredObject(LAST_CELL_INDEX_BY_WIDTH, 0, C_W, B_H, 'pink'),
        new BoardColoredObject(0, 0, C_W, B_H, 'pink'),
      ],
      pubSub,
      new TargetRenderer(rendererMock, target),
      new SnakeRenderer(rendererMock, snake),
    );

    return {
      rendererMock,
      snake,
      snakeMoveSpy,
      snakeEatSpy,
      snakeCanEatSpy,
      snakeDieSpy,
      target,
      pubSub,
      pubSubPublishSpy,
      aNibbles,
    };

    function createTarget({
      x = 4,
      y = 4,
      value = 25,
    }: {
      x?: number,
      y?: number,
      value?: number
    }) {
      const result = new Target(x, y, C_W, C_H, value);
      return result;
    }
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
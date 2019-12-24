import SnakeRenderer from '../src/SnakeRenderer';
import { flushPromise, loadSnakeSprite } from './support/helpers/testingUtils';
import Renderer from '../src/Renderer';
import Snake from '../src/Snake';
import BoardObject from '../src/BoardObject';
import {
  CELL_WIDTH as C_W,
  CELL_HEIGHT as C_H,
} from '../src/constants/common';
import {
  HEAD_RIGHT_TILE_X,
  HEAD_RIGHT_TILE_Y,
  HEAD_DOWN_TILE_X,
  HEAD_DOWN_TILE_Y,
  HEAD_LEFT_TILE_X,
  HEAD_LEFT_TILE_Y,
  HEAD_UP_TILE_X,
  HEAD_UP_TILE_Y,
  BODY_HORIZONTAL_TILE_X,
  BODY_HORIZONTAL_TILE_Y,
  BODY_VERTICAL_TILE_X,
  BODY_VERTICAL_TILE_Y,
  BODY_LEFT_TO_UP_TURN_TILE_Y,
  BODY_LEFT_TO_UP_TURN_TILE_X,
  BODY_UP_TO_RIGHT_TURN_TILE_X,
  BODY_UP_TO_RIGHT_TURN_TILE_Y,
  BODY_RIGHT_TO_DOWN_TURN_TILE_X,
  BODY_RIGHT_TO_DOWN_TURN_TILE_Y,
  BODY_DOWN_TO_LEFT_TURN_TILE_Y,
  BODY_DOWN_TO_LEFT_TURN_TILE_X
} from '../src/constants/snakeSprite';

describe('SnakeRenderer', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  it('renders snake image after snake sprite has loaded', async () => {
    const { aSnakeRenderer, rendererMock } = setup();

    aSnakeRenderer.render();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(0);

    await loadSnakeSprite();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(1);

    aSnakeRenderer.render();
    await flushPromise();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(2);
  });

  describe('picks correct tile for', () => {
    describe('head', () => {
      const testCases = [
        {
          title: 'renders head right tile',
          snakeData: { direction: Snake.DIRECTION_RIGHT },
          expectedSourceX: HEAD_RIGHT_TILE_X,
          expectedSourceY: HEAD_RIGHT_TILE_Y,
        },
        {
          title: 'renders head down tile',
          snakeData: { direction: Snake.DIRECTION_DOWN },
          expectedSourceX: HEAD_DOWN_TILE_X,
          expectedSourceY: HEAD_DOWN_TILE_Y,
        },
        {
          title: 'renders head left tile',
          snakeData: { direction: Snake.DIRECTION_LEFT },
          expectedSourceX: HEAD_LEFT_TILE_X,
          expectedSourceY: HEAD_LEFT_TILE_Y,
        },
        {
          title: 'renders head up tile',
          snakeData: { direction: Snake.DIRECTION_UP },
          expectedSourceX: HEAD_UP_TILE_X,
          expectedSourceY: HEAD_UP_TILE_Y,
        }
      ];
      testCases.forEach(t => it(t.title, async () => {
        const { aSnakeRenderer, rendererMock } = setup({
          snakeData: t.snakeData,
        });

        aSnakeRenderer.render();
        await loadSnakeSprite();

        expect(rendererMock.renderImage).toHaveBeenCalledTimes(1);
        const [result] = rendererMock.renderImage.calls.argsFor(0);
        expect(result.sourceX).toBe(t.expectedSourceX);
        expect(result.sourceY).toBe(t.expectedSourceY);
      }));
    });

    describe('body', () => {
      const testCases = [
        {
          title: 'renders body-horizontal-tile when snake is facing to left',
          snakeData: {
            body: [
              new BoardObject(3, 3, C_W, C_H, ''),
              new BoardObject(4, 3, C_W, C_H, ''),
              new BoardObject(5, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_LEFT,
          },
          expectedSourceX: BODY_HORIZONTAL_TILE_X,
          expectedSourceY: BODY_HORIZONTAL_TILE_Y,
        },
        {
          title: 'renders body-horizontal-tile when snake is facing to right',
          snakeData: {
            body: [
              new BoardObject(5, 3, C_W, C_H, ''),
              new BoardObject(4, 3, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_RIGHT,
          },
          expectedSourceX: BODY_HORIZONTAL_TILE_X,
          expectedSourceY: BODY_HORIZONTAL_TILE_Y,
        },
        {
          title: 'renders body-vertical-tile when snake is facing up',
          snakeData: {
            body: [
              new BoardObject(3, 3, C_W, C_H, ''),
              new BoardObject(3, 4, C_W, C_H, ''),
              new BoardObject(3, 5, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_UP,
          },
          expectedSourceX: BODY_VERTICAL_TILE_X,
          expectedSourceY: BODY_VERTICAL_TILE_Y,
        },
        {
          title: 'renders body-vertical-tile when snake is facing down',
          snakeData: {
            body: [
              new BoardObject(3, 5, C_W, C_H, ''),
              new BoardObject(3, 4, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_DOWN,
          },
          expectedSourceX: BODY_VERTICAL_TILE_X,
          expectedSourceY: BODY_VERTICAL_TILE_Y,
        },
        {
          title: 'renders body-left-to-up-turn-tile when snake is making left to up turn',
          snakeData: {
            body: [
              new BoardObject(3, 3, C_W, C_H, ''),
              new BoardObject(3, 4, C_W, C_H, ''),
              new BoardObject(4, 4, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_UP,
          },
          expectedSourceX: BODY_LEFT_TO_UP_TURN_TILE_X,
          expectedSourceY: BODY_LEFT_TO_UP_TURN_TILE_Y,
        },
        {
          title: 'renders body-left-to-up-turn-tile when snake is making down to right turn',
          snakeData: {
            body: [
              new BoardObject(4, 4, C_W, C_H, ''),
              new BoardObject(3, 4, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_RIGHT,
          },
          expectedSourceX: BODY_LEFT_TO_UP_TURN_TILE_X,
          expectedSourceY: BODY_LEFT_TO_UP_TURN_TILE_Y,
        },
        {
          title: 'renders body-up-to-right-turn-tile when snake is making up to right turn',
          snakeData: {
            body: [
              new BoardObject(4, 2, C_W, C_H, ''),
              new BoardObject(3, 2, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_RIGHT,
          },
          expectedSourceX: BODY_UP_TO_RIGHT_TURN_TILE_X,
          expectedSourceY: BODY_UP_TO_RIGHT_TURN_TILE_Y,
        },
        {
          title: 'renders body-up-to-right-turn-title when snake is making left to down turn',
          snakeData: {
            body: [
              new BoardObject(2, 4, C_W, C_H, ''),
              new BoardObject(2, 3, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_DOWN,
          },
          expectedSourceX: BODY_UP_TO_RIGHT_TURN_TILE_X,
          expectedSourceY: BODY_UP_TO_RIGHT_TURN_TILE_Y,
        },
        {
          title: 'renders body-right-to-down-tile when snake is making right to down turn',
          snakeData: {
            body: [
              new BoardObject(4, 4, C_W, C_H, ''),
              new BoardObject(4, 3, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_DOWN,
          },
          expectedSourceX: BODY_RIGHT_TO_DOWN_TURN_TILE_X,
          expectedSourceY: BODY_RIGHT_TO_DOWN_TURN_TILE_Y,
        },
        {
          title: 'renders body-right-to-down-tile when snake is making up to left turn',
          snakeData: {
            body: [
              new BoardObject(2, 2, C_W, C_H, ''),
              new BoardObject(3, 2, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_LEFT,
          },
          expectedSourceX: BODY_RIGHT_TO_DOWN_TURN_TILE_X,
          expectedSourceY: BODY_RIGHT_TO_DOWN_TURN_TILE_Y,
        },
        {
          title: 'renders body-down-to-left-turn-tile when snake is making down to left turn',
          snakeData: {
            body: [
              new BoardObject(2, 4, C_W, C_H, ''),
              new BoardObject(3, 4, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_LEFT,
          },
          expectedSourceX: BODY_DOWN_TO_LEFT_TURN_TILE_X,
          expectedSourceY: BODY_DOWN_TO_LEFT_TURN_TILE_Y,
        },
        {
          title: 'renders body-down-to-left-turn-tile when snake is making right to up turn',
          snakeData: {
            body: [
              new BoardObject(4, 2, C_W, C_H, ''),
              new BoardObject(4, 3, C_W, C_H, ''),
              new BoardObject(3, 3, C_W, C_H, ''),
            ],
            direction: Snake.DIRECTION_UP,
          },
          expectedSourceX: BODY_DOWN_TO_LEFT_TURN_TILE_X,
          expectedSourceY: BODY_DOWN_TO_LEFT_TURN_TILE_Y,
        }
      ];
      testCases.forEach(t => it(t.title, async () => {
        const { aSnakeRenderer, rendererMock } = setup({
          snakeData: t.snakeData
        });

        aSnakeRenderer.render();
        await loadSnakeSprite();

        expect(rendererMock.renderImage).toHaveBeenCalledTimes(3);
        const [result] = rendererMock.renderImage.calls.argsFor(1);
        expect(result.sourceX).toBe(t.expectedSourceX);
        expect(result.sourceY).toBe(t.expectedSourceY);
      }));
    });

    describe('tail', () => {

    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function setup({
    snakeData = {},
  } = {}) {
    const rendererMock: jasmine.SpyObj<Renderer> = createRendererMock();
    const aSnake = createSnake(snakeData);
    const aSnakeRenderer = new SnakeRenderer(rendererMock, aSnake);
    return {
      aSnakeRenderer,
      aSnake,
      rendererMock,
    };
    function createRendererMock() {
      return jasmine.createSpyObj(
        'Renderer',
        ['renderImage']
      );
    }
    function createSnake({
      body = [new BoardObject(1, 1, C_W, C_H, '')],
      direction = Snake.DIRECTION_RIGHT,
    }: {
      body?: Array<BoardObject>,
      direction?: string,
    }) {
      return new Snake(body, direction, 0);
    }
  }
});
import SnakeRenderer from '../src/SnakeRenderer';
import {
  flushPromise,
  loadSnakeSprite,
} from './support/helpers/testingUtils';
import {
  createRendererMock, createSnakeMock,
} from './support/helpers/componentMocks';
import Renderer from '../src/Renderer';
import Snake from '../src/Snake';
import BoardObject from '../src/BoardObject';
import * as S from '../src/constants/snakeSprite';

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
          expectedSourceX: S.HEAD_RIGHT_TILE_X,
          expectedSourceY: S.HEAD_RIGHT_TILE_Y,
        },
        {
          title: 'renders head down tile',
          snakeData: { direction: Snake.DIRECTION_DOWN },
          expectedSourceX: S.HEAD_DOWN_TILE_X,
          expectedSourceY: S.HEAD_DOWN_TILE_Y,
        },
        {
          title: 'renders head left tile',
          snakeData: { direction: Snake.DIRECTION_LEFT },
          expectedSourceX: S.HEAD_LEFT_TILE_X,
          expectedSourceY: S.HEAD_LEFT_TILE_Y,
        },
        {
          title: 'renders head up tile',
          snakeData: { direction: Snake.DIRECTION_UP },
          expectedSourceX: S.HEAD_UP_TILE_X,
          expectedSourceY: S.HEAD_UP_TILE_Y,
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
              new BoardObject(3, 3),
              new BoardObject(4, 3),
              new BoardObject(5, 3),
            ],
            direction: Snake.DIRECTION_LEFT,
          },
          expectedSourceX: S.BODY_HORIZONTAL_TILE_X,
          expectedSourceY: S.BODY_HORIZONTAL_TILE_Y,
        },
        {
          title: 'renders body-horizontal-tile when snake is facing to right',
          snakeData: {
            body: [
              new BoardObject(5, 3),
              new BoardObject(4, 3),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_RIGHT,
          },
          expectedSourceX: S.BODY_HORIZONTAL_TILE_X,
          expectedSourceY: S.BODY_HORIZONTAL_TILE_Y,
        },
        {
          title: 'renders body-vertical-tile when snake is facing up',
          snakeData: {
            body: [
              new BoardObject(3, 3),
              new BoardObject(3, 4),
              new BoardObject(3, 5),
            ],
            direction: Snake.DIRECTION_UP,
          },
          expectedSourceX: S.BODY_VERTICAL_TILE_X,
          expectedSourceY: S.BODY_VERTICAL_TILE_Y,
        },
        {
          title: 'renders body-vertical-tile when snake is facing down',
          snakeData: {
            body: [
              new BoardObject(3, 5),
              new BoardObject(3, 4),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_DOWN,
          },
          expectedSourceX: S.BODY_VERTICAL_TILE_X,
          expectedSourceY: S.BODY_VERTICAL_TILE_Y,
        },
        {
          title: 'renders body-left-to-up-turn-tile when snake is making left to up turn',
          snakeData: {
            body: [
              new BoardObject(3, 3),
              new BoardObject(3, 4),
              new BoardObject(4, 4),
            ],
            direction: Snake.DIRECTION_UP,
          },
          expectedSourceX: S.BODY_LEFT_TO_UP_TURN_TILE_X,
          expectedSourceY: S.BODY_LEFT_TO_UP_TURN_TILE_Y,
        },
        {
          title: 'renders body-left-to-up-turn-tile when snake is making down to right turn',
          snakeData: {
            body: [
              new BoardObject(4, 4),
              new BoardObject(3, 4),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_RIGHT,
          },
          expectedSourceX: S.BODY_LEFT_TO_UP_TURN_TILE_X,
          expectedSourceY: S.BODY_LEFT_TO_UP_TURN_TILE_Y,
        },
        {
          title: 'renders body-up-to-right-turn-tile when snake is making up to right turn',
          snakeData: {
            body: [
              new BoardObject(4, 2),
              new BoardObject(3, 2),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_RIGHT,
          },
          expectedSourceX: S.BODY_UP_TO_RIGHT_TURN_TILE_X,
          expectedSourceY: S.BODY_UP_TO_RIGHT_TURN_TILE_Y,
        },
        {
          title: 'renders body-up-to-right-turn-title when snake is making left to down turn',
          snakeData: {
            body: [
              new BoardObject(2, 4),
              new BoardObject(2, 3),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_DOWN,
          },
          expectedSourceX: S.BODY_UP_TO_RIGHT_TURN_TILE_X,
          expectedSourceY: S.BODY_UP_TO_RIGHT_TURN_TILE_Y,
        },
        {
          title: 'renders body-right-to-down-tile when snake is making right to down turn',
          snakeData: {
            body: [
              new BoardObject(4, 4),
              new BoardObject(4, 3),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_DOWN,
          },
          expectedSourceX: S.BODY_RIGHT_TO_DOWN_TURN_TILE_X,
          expectedSourceY: S.BODY_RIGHT_TO_DOWN_TURN_TILE_Y,
        },
        {
          title: 'renders body-right-to-down-tile when snake is making up to left turn',
          snakeData: {
            body: [
              new BoardObject(2, 2),
              new BoardObject(3, 2),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_LEFT,
          },
          expectedSourceX: S.BODY_RIGHT_TO_DOWN_TURN_TILE_X,
          expectedSourceY: S.BODY_RIGHT_TO_DOWN_TURN_TILE_Y,
        },
        {
          title: 'renders body-down-to-left-turn-tile when snake is making down to left turn',
          snakeData: {
            body: [
              new BoardObject(2, 4),
              new BoardObject(3, 4),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_LEFT,
          },
          expectedSourceX: S.BODY_DOWN_TO_LEFT_TURN_TILE_X,
          expectedSourceY: S.BODY_DOWN_TO_LEFT_TURN_TILE_Y,
        },
        {
          title: 'renders body-down-to-left-turn-tile when snake is making right to up turn',
          snakeData: {
            body: [
              new BoardObject(4, 2),
              new BoardObject(4, 3),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_UP,
          },
          expectedSourceX: S.BODY_DOWN_TO_LEFT_TURN_TILE_X,
          expectedSourceY: S.BODY_DOWN_TO_LEFT_TURN_TILE_Y,
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
      const testCases = [
        {
          title: 'renders tail-up-tile when tail is pointed up',
          snakeData: {
            body: [
              new BoardObject(3, 4),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_DOWN
          },
          expectedSourceX: S.TAIL_UP_TILE_X,
          expectedSourceY: S.TAIL_UP_TILE_Y,
        },
        {
          title: 'renders tail-right-tile when tail is pointed right',
          snakeData: {
            body: [
              new BoardObject(3, 3),
              new BoardObject(4, 3),
            ],
            direction: Snake.DIRECTION_LEFT,
          },
          expectedSourceX: S.TAIL_RIGHT_TILE_X,
          expectedSourceY: S.TAIL_RIGHT_TILE_Y,
        },
        {
          title: 'renders tail-down-tile when tail is pointed down',
          snakeData: {
            body: [
              new BoardObject(3, 3),
              new BoardObject(3, 4),
            ],
            direction: Snake.DIRECTION_UP,
          },
          expectedSourceX: S.TAIL_DOWN_TILE_X,
          expectedSourceY: S.TAIL_DOWN_TILE_Y,
        },
        {
          title: 'renders tail-left-tile whe tail is pointed left',
          snakeData: {
            body: [
              new BoardObject(4, 3),
              new BoardObject(3, 3),
            ],
            direction: Snake.DIRECTION_RIGHT,
          },
          expectedSourceX: S.TAIL_LEFT_TILE_X,
          expectedSourceY: S.TAIL_LEFT_TILE_Y,
        },
      ];
      testCases.forEach(t => it(t.title, async () => {
        const { aSnakeRenderer, rendererMock } = setup({
          snakeData: t.snakeData
        });

        aSnakeRenderer.render();
        await loadSnakeSprite();

        expect(rendererMock.renderImage).toHaveBeenCalledTimes(2);
        const [result] = rendererMock.renderImage.calls.argsFor(1);
        expect(result.sourceX).toBe(t.expectedSourceX);
        expect(result.sourceY).toBe(t.expectedSourceY);
      }));
    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function setup({
    snakeData = {},
  } = {}) {
    const rendererMock: jasmine.SpyObj<Renderer> = createRendererMock();
    const aSnakeRenderer = new SnakeRenderer(rendererMock, createSnakeMock(snakeData));
    return {
      aSnakeRenderer,
      rendererMock,
    };
  }
});
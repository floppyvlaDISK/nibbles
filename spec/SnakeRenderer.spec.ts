import SnakeRenderer from '../src/SnakeRenderer';
import { flushPromise, loadSnakeSprite } from './support/helpers/testingUtils';
import Renderer from '../src/Renderer';
import Snake from '../src/Snake';
import BoardObject from '../src/BoardObject';
import { CELL_WIDTH, CELL_HEIGHT } from '../src/constants/common';
import {
  HEAD_RIGHT_TILE_X,
  HEAD_RIGHT_TILE_Y,
  HEAD_DOWN_TILE_X,
  HEAD_DOWN_TILE_Y,
  HEAD_LEFT_TILE_X,
  HEAD_LEFT_TILE_Y,
  HEAD_UP_TILE_X,
  HEAD_UP_TILE_Y
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

  describe('picks correct tile', () => {
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
        const [aBoardImageObject] = rendererMock.renderImage.calls.argsFor(0);
        expect(aBoardImageObject.sourceX).toBe(t.expectedSourceX);
        expect(aBoardImageObject.sourceY).toBe(t.expectedSourceY);
      }));
    });

    describe('tail', () => {});

    describe('body', () => {});
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function setup({
    snakeData = {},
  } = {}) {
    const rendererMock: jasmine.SpyObj<Renderer> = createRendererMock();
    const aSnakeRenderer = new SnakeRenderer(rendererMock, createSnake(snakeData));
    return {
      aSnakeRenderer,
      rendererMock,
    };
    function createRendererMock() {
      return jasmine.createSpyObj(
        'Renderer',
        ['renderImage']
      );
    }
    function createSnake({
      x = 1,
      y = 1,
      direction = Snake.DIRECTION_RIGHT,
    }: {
      x?: number,
      y?: number,
      direction?: string,
    }) {
      return new Snake(
        new BoardObject(x, y, CELL_WIDTH, CELL_HEIGHT, ''),
        direction,
        0
      );
    }
  }
});
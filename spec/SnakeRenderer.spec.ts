import SnakeRenderer from '../src/SnakeRenderer';
import { flushPromise } from './support/helpers/testingUtils';
import Renderer from '../src/Renderer';
import Snake from '../src/Snake';
import BoardObject from '../src/BoardObject';
import { CELL_WIDTH, CELL_HEIGHT } from '../src/constants/common';

describe('SnakeRenderer', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  it('renders snake image after snake sprite has loaded', async () => {
    const { aSnakeRenderer, rendererMock } = setup();

    aSnakeRenderer.render();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(50);
    await flushPromise();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(1);

    aSnakeRenderer.render();
    await flushPromise();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function setup() {
    const rendererMock: jasmine.SpyObj<Renderer> = createRendererMock();
    const aSnakeRenderer = new SnakeRenderer(
      rendererMock,
      new Snake(
        new BoardObject(1, 1, CELL_WIDTH, CELL_HEIGHT, ''),
        Snake.DIRECTION_RIGHT,
        0
      )
    );
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
  }
});
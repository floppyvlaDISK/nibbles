import TargetRenderer from '../src/TargetRenderer';
import Renderer from '../src/Renderer';
import Target from '../src/Target';
import { CELL_WIDTH, CELL_HEIGHT } from '../src/constants/common';
import { flushPromise, loadSnakeSprite } from './support/helpers/testingUtils';

describe('TargetRenderer', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  it('renders target image after snake sprite has loaded', async () => {
    const { aTargetRenderer, rendererMock } = setup();

    aTargetRenderer.render();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(0);

    await loadSnakeSprite();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(1);

    aTargetRenderer.render();
    await flushPromise();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(2);
  });

  xit('picks correct tile', () => {});

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function setup() {
    const rendererMock: jasmine.SpyObj<Renderer> = createRendererMock();
    const aTargetRenderer = new TargetRenderer(
      rendererMock,
      new Target(1, 1, CELL_WIDTH, CELL_HEIGHT, '', 25)
    );
    return {
      aTargetRenderer,
      rendererMock,
    };
    function createRendererMock() {
      return jasmine.createSpyObj(
        'Renderer',
        ['renderImage'],
      );
    }
  }
});
import TargetRenderer from '../src/TargetRenderer';
import Renderer from '../src/Renderer';
import Target from '../src/Target';
import { CELL_WIDTH, CELL_HEIGHT } from '../src/CONST';
import { flushPromise } from './support/helpers/testingUtils';

describe('TargetRenderer', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  it('renders target image after image has loaded', async () => {
    const { aTargetRenderer, aTarget, rendererMock } = setup();

    aTargetRenderer.render(aTarget);

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(50);
    await flushPromise();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(1);

    aTargetRenderer.render(aTarget);
    await flushPromise();

    expect(rendererMock.renderImage).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function setup() {
    const rendererMock: jasmine.SpyObj<Renderer> = createRendererMock();
    const aTargetRenderer = new TargetRenderer(rendererMock);
    const aTarget = new Target(1, 1, CELL_WIDTH, CELL_HEIGHT, '', 25);
    return {
      aTargetRenderer,
      aTarget,
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
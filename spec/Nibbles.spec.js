import Nibbles from '../src/Nibbles';

describe('Nibbles', () => {
  let rendererMock;

  beforeEach(() => {
    jasmine.clock().install();
    rendererMock = createRendererMock();
  });

  it('render()', () => {
    const n = new Nibbles(rendererMock);

    n.render();

    testRenderCalls(1);
  });

  it('start()', () => {
    const n = new Nibbles(rendererMock);

    n.start();

    testRenderCalls(1);

    jasmine.clock().tick(750 * 4);

    testRenderCalls(5);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    rendererMock = undefined;
  });

  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['renderBoard', 'renderBoardObject'],
    );
  }

  function testRenderCalls(callCount) {
    expect(rendererMock.renderBoard).toHaveBeenCalledTimes(callCount);
    expect(rendererMock.renderBoardObject).toHaveBeenCalledTimes(callCount * 2);
  }
});
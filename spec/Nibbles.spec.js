import Nibbles from '../src/Nibbles';

describe('Nibbles', () => {
  let rendererMock;
  let snakeMock;

  beforeEach(() => {
    jasmine.clock().install();
    rendererMock = createRendererMock();
    snakeMock = createSnakeMock();
  });

  it('render()', () => {
    const aNibbles = setupNibbles();

    aNibbles.render();

    testRenderCalls(1);
  });

  it('start() render board and objects', () => {
    const aNibbles = setupNibbles();

    aNibbles.start();

    testRenderCalls(1);

    jasmine.clock().tick(750 * 4);

    testRenderCalls(5);
  });

  it('start() moves the snake', () => {
    const aNibbles = setupNibbles();

    expect(snakeMock.move).toHaveBeenCalledTimes(0);

    aNibbles.start();
    jasmine.clock().tick(750);

    expect(snakeMock.move).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    rendererMock = undefined;
    snakeMock = undefined;
  });

  function setupNibbles() {
    return new Nibbles(rendererMock, snakeMock);
  }
  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['renderBoard', 'renderBoardObject'],
    );
  }
  function createSnakeMock() {
    return jasmine.createSpyObj(
      'Snake',
      ['move']
    );
  }
  function testRenderCalls(callCount) {
    expect(rendererMock.renderBoard).toHaveBeenCalledTimes(callCount);
    expect(rendererMock.renderBoardObject).toHaveBeenCalledTimes(callCount * 2);
  }
});
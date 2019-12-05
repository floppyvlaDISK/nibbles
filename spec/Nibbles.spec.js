import Nibbles from '../src/Nibbles';
import { ARROW_UP } from '../src/utils/isArrowKey';

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

    expect(snakeMock.move).toHaveBeenCalledTimes(1);

    jasmine.clock().tick(750);

    expect(snakeMock.move).toHaveBeenCalledTimes(2);
  });

  it('setSnakeDirectionFromKeyCode() queues snake direction change to be set on performing update', () => {
    const aNibbles = setupNibbles();

    expect(snakeMock.setDirectionFromKeyCode).toHaveBeenCalledTimes(0);

    aNibbles.setSnakeDirectionFromKeyCode(ARROW_UP);
    aNibbles.start();
    jasmine.clock().tick(750);

    expect(snakeMock.setDirectionFromKeyCode).toHaveBeenCalledTimes(1);
    expect(snakeMock.setDirectionFromKeyCode).toHaveBeenCalledWith(ARROW_UP);
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
      ['move', 'setDirectionFromKeyCode']
    );
  }
  function testRenderCalls(callCount) {
    expect(rendererMock.renderBoard).toHaveBeenCalledTimes(callCount);
    expect(rendererMock.renderBoardObject).toHaveBeenCalledTimes(callCount * 2);
  }
});
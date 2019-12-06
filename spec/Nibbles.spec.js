import Nibbles from '../src/Nibbles';
import { ARROW_UP } from '../src/utils/isArrowKey';
import Snake from '../src/Snake';

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

    expect(snakeMock.direction).toBe(Snake.DIRECTION_RIGHT);

    aNibbles.setSnakeDirectionFromKeyCode(ARROW_UP);
    aNibbles.start();
    jasmine.clock().tick(750);

    expect(snakeMock.direction).toBe(Snake.DIRECTION_UP);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    rendererMock = undefined;
    snakeMock = undefined;
  });

  function setupNibbles() {
    return new Nibbles(
      rendererMock,
      snakeMock,
      null,
      []
    );
  }
  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['renderBoard', 'renderBoardObject'],
    );
  }
  function createSnakeMock() {
    const result = jasmine.createSpyObj(
      'Snake',
      ['move'],
    );
    result.direction = Snake.DIRECTION_RIGHT;
    return result;
  }
  function testRenderCalls(callCount) {
    expect(rendererMock.renderBoard).toHaveBeenCalledTimes(callCount);
    expect(rendererMock.renderBoardObject).toHaveBeenCalledTimes(callCount * 2);
  }
});
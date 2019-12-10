import Renderer from '../src/Renderer';
import BoardObject from '../src/BoardObject';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_WIDTH, CELL_HEIGHT } from '../src/CONST';

describe('Renderer', () => {
  let containerMock: jasmine.SpyObj<HTMLElement>;
  let contextMock: jasmine.SpyObj<CanvasRenderingContext2D>;
  let canvasMock: jasmine.SpyObj<HTMLCanvasElement>;

  beforeEach(() => {
    setupMocks();
  });

  it('creates canvas on instantiation', () => {
    new Renderer(containerMock);

    expect(containerMock.appendChild).toHaveBeenCalledTimes(1);
    expect(containerMock.appendChild).toHaveBeenCalledWith(canvasMock);
  });

  it('gets context', () => {
    const r = new Renderer(containerMock);

    expect(r.ctx).toEqual(contextMock);
    expect(canvasMock.getContext).toHaveBeenCalledTimes(1);
    expect(canvasMock.getContext).toHaveBeenCalledWith('2d');
  });

  it('renderBoard()', () => {
    const r = new Renderer(containerMock);

    r.renderBoard();

    expect(contextMock.fillStyle).toBe('#FFE4E1');
    expect(contextMock.fillRect).toHaveBeenCalledTimes(1);
    expect(contextMock.fillRect).toHaveBeenCalledWith(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  });

  it('renderBoardObject()', () => {
    const r = new Renderer(containerMock);
    const aBoardObject = new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue');

    r.renderBoard();
    r.renderBoardObject(aBoardObject);

    expect(contextMock.fillStyle).toBe('blue');
    expect(contextMock.fillRect).toHaveBeenCalledTimes(2);
    expect(contextMock.fillRect.calls.argsFor(1)).toEqual([
      3 * CELL_WIDTH,
      3 * CELL_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT,
    ]);
  });

  function setupMocks() {
    containerMock = createContainerMock();
    contextMock = createContextMock();
    canvasMock = createCanvasMock();
    createDocumentMock();

    function createContainerMock() {
      return jasmine.createSpyObj('container', {
        appendChild: jasmine.createSpy(),
      });
    }
    function createCanvasMock() {
      return jasmine.createSpyObj('canvas', {
        setAttribute: undefined,
        getContext: contextMock,
      });
    }
    function createContextMock() {
      return jasmine.createSpyObj(
        'ctx',
        ['fillRect'],
      );
    }
    function createDocumentMock() {
      spyOn(document, 'createElement').and.returnValue(canvasMock);
    }
  }
});
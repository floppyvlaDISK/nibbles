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

  it('render()', () => {
    const r = new Renderer(containerMock);
    const aBoardObject = new BoardObject(3, 3, CELL_WIDTH, CELL_HEIGHT, 'blue');

    r.render(aBoardObject);

    expect(canvasMock.getContext).toHaveBeenCalledTimes(2);
    expect(canvasMock.getContext).toHaveBeenCalledWith('2d');
    expect(contextMock.fillStyle).toBe('blue');
    expect(contextMock.fillRect).toHaveBeenCalledTimes(1);
    expect(contextMock.fillRect.calls.argsFor(0)).toEqual([
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
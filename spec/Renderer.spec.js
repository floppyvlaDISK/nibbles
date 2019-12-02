import Renderer from '../src/Renderer';
import BoardObject from '../src/BoardObject';

describe('Renderer', () => {
  let containerMock;
  let contextMock;
  let canvasMock;

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
    expect(contextMock.fillRect).toHaveBeenCalledWith(0, 0, 800, 800);
  });

  it('renderBoardObject()', () => {
    const r = new Renderer(containerMock);
    const aBoardObject = new BoardObject(250, 250, 40, 40, 'blue');

    r.renderBoard();
    r.renderBoardObject(aBoardObject);

    expect(contextMock.fillStyle).toBe('blue');
    expect(contextMock.fillRect).toHaveBeenCalledTimes(2);
    expect(contextMock.fillRect.calls.argsFor(1)).toEqual([250, 250, 40, 40]);
  });

  afterEach(() => {
    clearMocks();
  });

  function setupMocks() {
    containerMock = createContainerMock();
    contextMock = createContextMock();
    canvasMock = createCanvasMock();
    createDocumentMock();

    function createContainerMock() {
      return {
        appendChild: jasmine.createSpy(),
      };
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

  function clearMocks() {
    containerMock = undefined;
    contextMock = undefined;
    canvasMock = undefined;
  }
});
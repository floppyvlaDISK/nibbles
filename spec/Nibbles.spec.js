import Nibbles from '../src/Nibbles';

describe('Nibbles', () => {
  let rendererMock;

  beforeEach(() => {
    rendererMock = createRendererMock();
  });

  it('render()', () => {
    const r = new Nibbles(rendererMock);

    r.render();

    expect(rendererMock.renderBoard).toHaveBeenCalledTimes(1);
    expect(rendererMock.renderBoardObject).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    rendererMock = undefined;
  });

  function createRendererMock() {
    return jasmine.createSpyObj(
      'Renderer',
      ['renderBoard', 'renderBoardObject'],
    );
  }
});
import Nibbles from '../src/Nibbles';

describe('Nibbles', () => {
  let containerMock;
  beforeEach(() => {
    containerMock = {};
  });

  it('render()', () => {
    const n = new Nibbles(containerMock);

    expect(containerMock.innerHTML).toBe(undefined);

    n.render();

    expect(containerMock.innerHTML).toBe('<div>Nibbles game</div>');
  });
});
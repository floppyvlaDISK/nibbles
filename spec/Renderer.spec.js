import Renderer from "../src/Renderer";

describe('Renderer', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
  });

  it('creates canvas on instantiation', () => {
    const r = new Renderer(container);

    expect(container.getElementsByTagName('canvas').length).toBe(1);
    expect(typeof r.ctx).toBe('object');
  });

  afterEach(() => {
    container = undefined;
  });
});
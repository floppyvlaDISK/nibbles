import ScoreDashboard from '../src/ScoreDashboard';

describe('ScoreDashboard', () => {
  let containerMock: jasmine.SpyObj<HTMLElement>;

  beforeEach(() => {
    containerMock = createContainerMock();
  });

  it('creates score element on instantiation', () => {
    new ScoreDashboard(containerMock);

    expect(containerMock.appendChild).toHaveBeenCalledTimes(1);
  });

  it('throws if container is not defined', () => {
    const fn = () => new ScoreDashboard(null);
    expect(fn).toThrow();
  });

  it('render() updates score element content', () => {
    const dashboard = new ScoreDashboard(containerMock);

    dashboard.render(10);

    expect(dashboard.toString()).toBe('Score: 10');
  });

  function createContainerMock() {
    return jasmine.createSpyObj(
      'container',
      ['appendChild'],
    );
  }
});
import CurrentScore from '../src/CurrentScore';
import { createContainerMock } from './support/helpers/componentMocks';

describe('CurrentScore', () => {
  let containerMock: jasmine.SpyObj<HTMLElement>;

  beforeEach(() => {
    containerMock = createContainerMock();
  });

  it('creates score element on instantiation', () => {
    new CurrentScore(containerMock);

    expect(containerMock.appendChild).toHaveBeenCalledTimes(1);
  });

  it('throws if container is not defined', () => {
    const fn = () => new CurrentScore(null);

    expect(fn).toThrow();
  });

  describe('render()', () => {
    it('updates score element content', () => {
      const dashboard = new CurrentScore(containerMock);

      dashboard.render(10);

      expect(dashboard.toString()).toBe('Score: 10');
    });
  });
});
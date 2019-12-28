import CurrentScore from '../src/CurrentScore';
import { createContainer } from './support/helpers/testingUtils';

describe('CurrentScore', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = createContainer();
  });

  it('creates score element on instantiation', () => {
    new CurrentScore(container);

    expect(container.children.length).toBeGreaterThan(0);
  });

  it('throws if container is not defined', () => {
    const fn = () => new CurrentScore(null);

    expect(fn).toThrow();
  });

  describe('render()', () => {
    it('updates score element content', () => {
      const currentScore = new CurrentScore(container);

      currentScore.render(10);

      expect(container.textContent).toBe('Current score: 10');
    });
  });
});
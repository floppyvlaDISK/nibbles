import TopScoresList from '../src/TopScoresList';
import LocalStorageWrapper from '../src/utils/LocalStorageWrapper';

describe('TopScoresList', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = createContainer();
  });

  it('creates list element on instantiation', () => {
    new TopScoresList(container, new LocalStorageWrapper());

    expect(container.childNodes.length).toBeGreaterThan(0);
  });

  it('throws if container is not defined', () => {
    const fn = () => new TopScoresList(undefined, new LocalStorageWrapper());

    expect(fn).toThrow();
  });

  describe('render()', () => {
    it('renders "no items message" if there are 0 scores', () => {
      const localStorageWrapper = new LocalStorageWrapper();
      spyOn(localStorageWrapper, 'get').and.returnValue(null);
      const topScoresList = new TopScoresList(container, new LocalStorageWrapper());

      topScoresList.render();

      expect(container.textContent).toBe('No saved scores yet.');
    });

    it('renders list if there are 1+ scores', () => {
      const scores = ['5', '4', '3', '2', '1'];
      spyOn(LocalStorageWrapper.prototype, 'get').and.returnValue(
        JSON.stringify(scores)
      );
      const topScoresList = new TopScoresList(container, new LocalStorageWrapper());

      topScoresList.render();

      expect(container.querySelector('ul').childElementCount).toBe(5);
      expect(Array.from(container.querySelectorAll('li')).map(e => e.textContent))
        .toEqual(scores);
    });
  });

  describe('updateTopScores()', () => {
    const testCases = [
      {
        title: 'changes top 5 values if new value is amount top 5',
        score: JSON.stringify(['10', '7', '6', '5', '3']),
        value: 8,
        expectedResult: JSON.stringify(['10', '8', '7', '6', '5']),
      },
      {
        title: 'does not change top 5 values if new value is not amount top 5',
        score: JSON.stringify(['10', '7', '6', '5', '3']),
        value: 2,
        expectedResult: JSON.stringify(['10', '7', '6', '5', '3']),
      },
      {
        title: 'removes duplicates',
        score: JSON.stringify(['10', '7', '6', '5', '3']),
        value: 10,
        expectedResult: JSON.stringify(['10', '7', '6', '5', '3']),
      },
    ];
    testCases.forEach(t => it(t.title, () => {
      spyOn(LocalStorageWrapper.prototype, 'get').and.returnValue(t.score);
      const setSpy = spyOn(LocalStorageWrapper.prototype, 'set');
      const topScoresList = new TopScoresList(container, new LocalStorageWrapper());

      topScoresList.updateTopScores(t.value);

      expect(setSpy).toHaveBeenCalledTimes(1);
      expect(setSpy.calls.argsFor(0)).toEqual(['topScores', t.expectedResult]);
    }));
  });

  function createContainer() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    return div;
  }
});
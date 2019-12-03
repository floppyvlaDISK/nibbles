import GameController from '../src/GameController';
import { ARRROW_UP } from '../src/utils/isArrowKey';

describe('GameController', () => {
  let nibblesMock;

  beforeEach(() => {
    nibblesMock = createNibblesStack();
  });

  it('exec() renders nibbles', () => {
    const c = new GameController(nibblesMock);

    expect(nibblesMock.render).toHaveBeenCalledTimes(0);

    c.exec();

    expect(nibblesMock.render).toHaveBeenCalledTimes(1);
  });

  it('exec() sets up keydown event listener that starts nibbles on arrow keys', () => {
    const c = new GameController(nibblesMock);

    fireKeybordEvent({ keyCode: ARRROW_UP });

    expect(nibblesMock.start).toHaveBeenCalledTimes(0);

    c.exec();
    fireKeybordEvent({ keyCode: ARRROW_UP });

    expect(nibblesMock.start).toHaveBeenCalledTimes(1);

    fireKeybordEvent({ keyCode: ARRROW_UP });

    expect(nibblesMock.start).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    nibblesMock = undefined;
  });

  function createNibblesStack() {
    return jasmine.createSpyObj(
      'Nibbles',
      ['render', 'start']
    );
  }

  function fireKeybordEvent(eventInitDict = {}) {
    const event = new KeyboardEvent('keydown', eventInitDict);
    document.body.dispatchEvent(event);
  }
});
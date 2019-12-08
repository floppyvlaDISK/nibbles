import GameController from '../src/GameController';
import { ARROW_UP } from '../src/utils/isArrowKey';
import Nibbles from '../src/Nibbles';

describe('GameController', () => {
  let nibblesMock: jasmine.SpyObj<Nibbles>;

  beforeEach(() => {
    nibblesMock = createNibblesStack();
  });

  it('exec() renders nibbles', () => {
    const controller = new GameController(nibblesMock);

    expect(nibblesMock.render).toHaveBeenCalledTimes(0);

    controller.exec();

    expect(nibblesMock.render).toHaveBeenCalledTimes(1);
  });

  it('exec() sets up keydown event listener that starts nibbles on arrow keys', () => {
    const controller = new GameController(nibblesMock);

    fireKeybordEvent({ keyCode: ARROW_UP });

    expect(nibblesMock.start).toHaveBeenCalledTimes(0);

    controller.exec();
    fireKeybordEvent({ keyCode: ARROW_UP });

    expect(nibblesMock.start).toHaveBeenCalledTimes(1);

    fireKeybordEvent({ keyCode: ARROW_UP });

    expect(nibblesMock.start).toHaveBeenCalledTimes(1);
  });

  it('updates snake direction on arrow key down', () => {
    const controller = new GameController(nibblesMock);

    expect(nibblesMock.setSnakeDirectionFromKeyCode).toHaveBeenCalledTimes(0);

    controller.exec();
    fireKeybordEvent({ keyCode: ARROW_UP });

    expect(nibblesMock.setSnakeDirectionFromKeyCode).toHaveBeenCalledTimes(1);
    expect(nibblesMock.setSnakeDirectionFromKeyCode).toHaveBeenCalledWith(ARROW_UP);
  });

  function createNibblesStack() {
    return jasmine.createSpyObj(
      'Nibbles',
      ['render', 'start', 'setSnakeDirectionFromKeyCode']
    );
  }

  function fireKeybordEvent(eventInitDict = {}) {
    const event = new KeyboardEvent('keydown', eventInitDict);
    document.body.dispatchEvent(event);
  }
});
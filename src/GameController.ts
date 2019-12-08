import isArrowKey from './utils/isArrowKey';
import Nibbles from './Nibbles';

export default class GameController {
  private _nibbles: Nibbles;
  private _hasStarted: boolean;

  constructor(nibbles: Nibbles) {
    this._nibbles = nibbles;
    this._hasStarted = false;
  }

  public exec() {
    this._nibbles.render();
    this._addKeyDownEventListener();
  }

  private _addKeyDownEventListener() {
    document.body.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (isArrowKey(event.keyCode)) {
      this._setSnakeDirection(event.keyCode);
      if (!this._hasStarted) {
        this._startTheGame();
      }
    }
  }

  private _setSnakeDirection(keyCode: number) {
    this._nibbles.setSnakeDirectionFromKeyCode(keyCode);
  }

  private _startTheGame() {
    this._hasStarted = true;
    this._nibbles.start();
  }
}
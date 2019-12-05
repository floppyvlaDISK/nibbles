import isArrowKey from './utils/isArrowKey';

export default class GameController {
  constructor(nibbles) {
    this._nibbles = nibbles;
    this._hasStarted = false;
  }

  exec() {
    this._nibbles.render();
    this._addKeyDownEventListener();
  }

  _addKeyDownEventListener() {
    document.body.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  _handleKeyDown(event) {
    if (isArrowKey(event.keyCode)) {
      this._setSnakeDirection(event.keyCode);
      if (!this._hasStarted) {
        this._startTheGame();
      }
    }
  }

  _setSnakeDirection(keyCode) {
    this._nibbles.setSnakeDirectionFromKeyCode(keyCode);
  }

  _startTheGame() {
    this._hasStarted = true;
    this._nibbles.start();
  }
}
import isArrowKey from './utils/isArrowKey';

export default class GameController {
  constructor(nibbles) {
    this._nibbles = nibbles;
    this._hasStarted = false;
  }

  exec() {
    this._nibbles.render();
    this.addKeyDownEventListener();
  }

  addKeyDownEventListener() {
    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    if (!isArrowKey(event.keyCode)) {
      if (!this._hasStarted) {
        this._hasStarted = true;
        this._nibbles.start();
      }
    }
  }
}
export default class Nibbles {
  constructor(container) {
    this._container = container;
  }

  render() {
    this._container.innerHTML = '<div>Nibbles game</div>';
  }
}
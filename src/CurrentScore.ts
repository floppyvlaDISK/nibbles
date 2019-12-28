export default class CurrentScore {
  private _scoreElement: HTMLElement;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new TypeError('CurrentScore: container is not a valid HTMLElement');
    }
    this._scoreElement = this._createScoreElement(container);

    this.render = this.render.bind(this);
  }

  public render(value: number) {
    this._scoreElement.textContent = `Current score: ${value}`;
  }

  private _createScoreElement(container: HTMLElement) {
    const div = document.createElement('div');
    container.appendChild(div);
    return div;
  }
}
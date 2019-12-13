export default class ScoreDashboard {
  private _scoreContent: HTMLElement;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new TypeError('ScoreDashboard: container is not a valid HTMLElement');
    }
    this._scoreContent = this._createScoreElement(container);

    this.render = this.render.bind(this);
  }

  toString() {
    return this._scoreContent.textContent;
  }

  render(value: number) {
    console.log(value);
    this._scoreContent.textContent = `Score: ${value}`;
  }

  private _createScoreElement(container: HTMLElement) {
    const div = document.createElement('div');
    container.appendChild(div);
    return div;
  }
}
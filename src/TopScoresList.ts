import LocalStorageWrapper from './utils/LocalStorageWrapper';
import removeDuplicatesFrom from './utils/removeDuplicatesFrom';

export default class TopScoresList {
  private _listElement: HTMLElement;
  private _storage: LocalStorageWrapper;

  constructor(container: HTMLElement, storage: LocalStorageWrapper) {
    if (!container) {
      throw TypeError('TopScoresList: container is not a valid HTMLElement');
    }

    this._listElement = this._createListElement(container);
    this._storage = storage;

    this.updateTopScores = this.updateTopScores.bind(this);
  }

  private static MAX_LEN = 5;

  public render() {
    this._listElement.innerHTML = this._scores().length
      ? `
        ${this._renderTitle()}
        ${this._renderScoresList()}
      `.trim()
      : this._renderNoItemsMessage();
  }

  public updateTopScores(value: number) {
    this._addScore(value);
    this.render();
  }

  private _renderTitle() {
    return '<p>Top scores</p>';
  }

  private _renderScoresList() {
    let result = this._scores().reduce(
      (result, score) => result += this._renderScore(score),
      ''
    );
    return `<ul>${result}</ul>`;
  }

  private _renderScore(value: string) {
    return `<li>${value}</li>`;
  }

  private _renderNoItemsMessage() {
    return `<p>No saved scores yet.</p>`;
  }

  private _scores(): Array<string> {
    return LocalStorageWrapper.parse(this._storage.get('topScores'));
  }

  private _addScore(value: number) {
    const result = (
      value
        ? removeDuplicatesFrom([...this._scores(), String(value)])
        : this._scores()
    )
      .sort((a, b) => Number(b) - Number(a))
      .slice(0, TopScoresList.MAX_LEN);
    this._storage.set('topScores', LocalStorageWrapper.stringify(result));
  }

  private _createListElement(container: HTMLElement) {
    const div = document.createElement('div');
    container.appendChild(div);
    return div;
  }
}
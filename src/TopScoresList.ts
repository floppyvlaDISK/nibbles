export default class TopScoresList {
  private _listElement: HTMLElement;

  constructor(container: HTMLElement) {
    if (!container) {
      throw TypeError('TopScoresList: container is not a valid HTMLElement');
    }

    this._listElement = this._createListElement(container);
  }

  public render() {
    this._listElement.innerHTML = this._topScoresListString();
  }

  public updateTopScores() {
    console.log('boi');
  }

  private _topScoresListString() {
    return this._topScores().reduce(
      (result, score) => result += this._renderScore(score),
      ''
    );
  }

  private _renderScore(value: string) {
    return value;
  }

  private _topScores(): Array<string> {
    return Array(5).fill({}).map((_, index) => String(index));
  }

  private _createListElement(container: HTMLElement) {
    const div = document.createElement('div');
    container.appendChild(div);
    return div;
  }
}
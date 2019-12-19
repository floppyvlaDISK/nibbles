export default class SnakeScore {
  private _score: number;
  private _initialScore: number;

  constructor(score: number) {
    this._score = score;
    this._initialScore = score;
  }

  get score() {
    return this._score;
  }

  public increaseBy(value: number) {
    this._score += value;
  }

  public reset() {
    this._score = this._initialScore;
  }
}
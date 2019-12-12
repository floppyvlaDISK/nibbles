export default class PubSub {
  private _listeners: { [index: string]: Array<Function> } = {};

  public subscribe(eventName: string, listener: Function) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(listener);
  }

  public publish(eventName: string, ...args: Array<any>) {
    if(this._listeners[eventName]) {
      this._listeners[eventName].forEach(cb => cb(...args));
    }
  }
}
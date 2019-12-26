export default class LocalStorageWrapper {
  public get(key: string) {
    let result;
    try {
      result = window.localStorage.getItem(key);
    } catch (err) {
      result = null;
    }
    return result;
  }

  public set(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  static parse(value: string | null) {
    return JSON.parse(value || '[]');
  }

  static stringify(value: any) {
    return JSON.stringify(value);
  }
}
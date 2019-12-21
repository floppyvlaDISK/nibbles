export class Image {
  public onload: Function;
  set src(arg: string) {
    this.onload();
  }
}
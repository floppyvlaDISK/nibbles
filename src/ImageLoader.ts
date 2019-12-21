export default class ImageLoader {
  private _image: HTMLImageElement;
  private _hasImageLoaded: boolean = false;

  constructor(imageSrc: string) {
    this._loadImage(imageSrc);
  }

  get image() {
    return this._image;
  }

  public waitForImageToLoad() {
    return new Promise(resolve => {
      if (this._hasImageLoaded) {
        resolve();
      } else {
        setTimeout(
          () => this.waitForImageToLoad().then(resolve),
          50
        );
      }
    });
  }

  private _loadImage(imageSrc: string) {
    this._image = new Image();
    this._image.onload = () => {
      this._hasImageLoaded = true;
    };
    this._image.src = imageSrc;
  }
}
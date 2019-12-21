export default class ImageLoader {
  private _image: HTMLImageElement;
  private _imageSrc: string;
  private _hasImageLoaded: boolean = false;

  constructor(spriteSrc: string) {
    this._imageSrc = spriteSrc;
    this._loadImage();
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

  private _loadImage() {
    this._image = new Image();
    this._image.onload = () => {
      this._hasImageLoaded = true;
    };
    this._image.src = this._imageSrc;
  }
}
import Renderer from './Renderer';
import Target from './Target';
import BoardImageObject from './BoardImageObject';
import { SNAKE_SPRITE_URL } from './CONST';

export default class TargetRenderer {
  private _baseRenderer: Renderer;
  private _image: HTMLImageElement;
  private _hasImageLoaded: boolean = false;

  private static SOURCE_X = 0;
  private static SOURCE_Y = 192;
  private static SOURCE_WIDTH = 64;
  private static SOURCE_HEIGHT = 64;

  constructor(renderer: Renderer) {
    this._baseRenderer = renderer;
    this._loadSprite();
  }

  public render(obj: Target) {
    this._waitForImageToLoad().then(() => {
      this._baseRenderer.renderImage(this._transformTarget(obj))
    });
  }

  private _loadSprite() {
    this._image = new Image();
    this._image.onload = () => {
      this._hasImageLoaded = true;
    };
    this._image.src = SNAKE_SPRITE_URL;
  }

  private _waitForImageToLoad() {
    return new Promise(resolve => {
      if (this._hasImageLoaded) {
        resolve();
      } else {
        setTimeout(
          () => this._waitForImageToLoad().then(resolve),
          50
        );
      }
    });
  }

  private _transformTarget(obj: Target) {
    return new BoardImageObject(
      this._image,
      TargetRenderer.SOURCE_X,
      TargetRenderer.SOURCE_Y,
      TargetRenderer.SOURCE_WIDTH,
      TargetRenderer.SOURCE_HEIGHT,
      obj.x,
      obj.y,
      obj.width,
      obj.height
    );
  }
}
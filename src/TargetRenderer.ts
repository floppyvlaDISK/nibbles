import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import Target from './Target';
import BoardImageObject from './BoardImageObject';
import { SNAKE_SPRITE_URL } from './constants/common';

export default class TargetRenderer {
  private _baseRenderer: Renderer;
  private _imageLoader: ImageLoader;

  private static SOURCE_X = 0;
  private static SOURCE_Y = 192;
  private static SOURCE_WIDTH = 64;
  private static SOURCE_HEIGHT = 64;

  constructor(renderer: Renderer) {
    this._baseRenderer = renderer;
    // TODO: I could load image once instead of twice if I were to pass this as parameter
    this._imageLoader = new ImageLoader(SNAKE_SPRITE_URL);
  }

  public render(obj: Target) {
    this._imageLoader.waitForImageToLoad().then(() => {
      this._baseRenderer.renderImage(this._transformTarget(obj))
    });
  }

  private _transformTarget(obj: Target) {
    return new BoardImageObject(
      this._imageLoader.image,
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
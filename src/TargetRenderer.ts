import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import Target from './Target';
import BoardImageObject from './BoardImageObject';
import {
  SNAKE_SPRITE_URL,
  SNAKE_TILE_WIDTH,
  SNAKE_TILE_HEIGHT
} from './constants/snakeSprite';

export default class TargetRenderer {
  private _baseRenderer: Renderer;
  private _imageLoader: ImageLoader;

  private static TARGET_TILE_X = 0;
  private static TARGET_TILE_Y = 192;

  constructor(renderer: Renderer) {
    this._baseRenderer = renderer;
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
      TargetRenderer.TARGET_TILE_X,
      TargetRenderer.TARGET_TILE_Y,
      SNAKE_TILE_WIDTH,
      SNAKE_TILE_HEIGHT,
      obj.x,
      obj.y,
      obj.width,
      obj.height
    );
  }
}
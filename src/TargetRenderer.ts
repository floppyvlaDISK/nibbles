import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import Target from './Target';
import BoardImageObject from './BoardImageObject';
import {
  SNAKE_SPRITE_URL,
  SNAKE_TILE_WIDTH,
  SNAKE_TILE_HEIGHT,
  TARGET_TILE_X,
  TARGET_TILE_Y
} from './constants/snakeSprite';

export default class TargetRenderer {
  private _baseRenderer: Renderer;
  private _imageLoader: ImageLoader;
  private _target: Target;

  constructor(renderer: Renderer, target: Target) {
    this._baseRenderer = renderer;
    this._target = target;
    this._imageLoader = new ImageLoader(SNAKE_SPRITE_URL);
  }

  public render() {
    this._imageLoader.waitForImageToLoad().then(() => {
      this._baseRenderer.renderImage(this._transformTarget())
    });
  }

  private _transformTarget() {
    return new BoardImageObject(
      this._imageLoader.image,
      TARGET_TILE_X,
      TARGET_TILE_Y,
      SNAKE_TILE_WIDTH,
      SNAKE_TILE_HEIGHT,
      this._target.x,
      this._target.y,
      this._target.width,
      this._target.height
    );
  }
}
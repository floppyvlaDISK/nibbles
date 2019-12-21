import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import { SNAKE_SPRITE_URL, SNAKE_TILE_HEIGHT, SNAKE_TILE_WIDTH } from './constants/snakeSprite';
import Snake from './Snake';
import BoardObject from './BoardObject';
import BoardImageObject from './BoardImageObject';

export default class SnakeRenderer {
  private _baseRenderer: Renderer;
  private _imageLoader: ImageLoader;

  constructor(renderer: Renderer) {
    this._baseRenderer = renderer;
    this._imageLoader = new ImageLoader(SNAKE_SPRITE_URL);
  }

  public render(aSnake: Snake) {
    this._imageLoader.waitForImageToLoad().then(() => {
      aSnake.forEachBodyPart((obj: BoardObject) => {
        this._baseRenderer.renderImage(this._transformSnakeBodyPart(obj));
      });
    });
  }

  private _transformSnakeBodyPart(obj: BoardObject) {
    return new BoardImageObject(
      this._imageLoader.image,
      this._calculateTileX(obj),
      this._calculateTileY(obj),
      SNAKE_TILE_WIDTH,
      SNAKE_TILE_HEIGHT,
      obj.x,
      obj.y,
      obj.width,
      obj.height,
    );
  }

  private _calculateTileX(obj: BoardObject) {
    return 0;
  }

  private _calculateTileY(obj: BoardObject) {
    return 192;
  }
}
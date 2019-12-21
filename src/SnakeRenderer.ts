import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import { SNAKE_SPRITE_URL } from './CONST';
import Snake from './Snake';
import BoardObject from './BoardObject';
import BoardImageObject from './BoardImageObject';

export default class SnakeRenderer {
  private _baseRenderer: Renderer;
  private _imageLoader: ImageLoader;

  constructor(renderer: Renderer) {
    this._baseRenderer = renderer;
    // TODO: I could load image once instead of twice if I were to pass this as parameter
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
      0,
      192,
      64,
      64,
      obj.x,
      obj.y,
      obj.width,
      obj.height,
    );
  }
}
import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import { SNAKE_SPRITE_URL } from './CONST';
import Snake from './Snake';
import BoardObject from './BoardObject';

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
      aSnake.forEachBodyPart(
        (obj: BoardObject) => this._baseRenderer.render(obj)
      );
    });
  }
}
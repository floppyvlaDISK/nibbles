import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import {
  SNAKE_SPRITE_URL,
  SNAKE_TILE_HEIGHT,
  SNAKE_TILE_WIDTH,
  HEAD_UP_TILE_X,
  HEAD_UP_TILE_Y,
  HEAD_LEFT_TILE_X,
  HEAD_LEFT_TILE_Y,
  HEAD_DOWN_TILE_X,
  HEAD_DOWN_TILE_Y,
  TAIL_DOWN_TILE_X,
  TAIL_DOWN_TILE_Y,
  TAIL_LEFT_TILE_X,
  TAIL_LEFT_TILE_Y,
  TAIL_RIGHT_TILE_X,
  TAIL_RIGHT_TILE_Y,
  TAIL_UP_TILE_X,
  TAIL_UP_TILE_Y,
  BODY_HORIZONTAL_TILE_X,
  BODY_HORIZONTAL_TILE_Y,
  BODY_VERTICAL_TILE_X,
  BODY_VERTICAL_TILE_Y,
  BODY_LEFT_TO_UP_TURN_TILE_X,
  BODY_LEFT_TO_UP_TURN_TILE_Y,
  BODY_UP_TO_RIGHT_TURN_TILE_X,
  BODY_UP_TO_RIGHT_TURN_TILE_Y,
  BODY_RIGHT_TO_DOWN_TURN_TILE_X,
  BODY_RIGHT_TO_DOWN_TURN_TILE_Y,
  BODY_DOWN_TO_LEFT_TURN_TILE_X,
  BODY_DOWN_TO_LEFT_TURN_TILE_Y
} from './constants/snakeSprite';
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

  /*

    head - 4 vars
    tail - 4 vars
    other - 6 vars

  */

  private _calculateTileCoordinates(aSnake: Snake, obj: BoardObject) {
    if (aSnake.body.head === obj) {

    } else if (aSnake.body.tail === obj) {

    } else {

    }
  }

  private _calculateTileX(obj: BoardObject) {
    return BODY_DOWN_TO_LEFT_TURN_TILE_X;
  }

  private _calculateTileY(obj: BoardObject) {
    return BODY_DOWN_TO_LEFT_TURN_TILE_Y;
  }
}
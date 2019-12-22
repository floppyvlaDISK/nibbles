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
  BODY_DOWN_TO_LEFT_TURN_TILE_Y,
  HEAD_RIGHT_TILE_X,
  HEAD_RIGHT_TILE_Y
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

  // TODO: Move Snake to constructor
  public render(aSnake: Snake) {
    this._imageLoader.waitForImageToLoad().then(() => {
      aSnake.forEachBodyPart((obj: BoardObject) => {
        this._baseRenderer.renderImage(this._transformSnakeBodyPart(obj, aSnake));
      });
    });
  }

  private _transformSnakeBodyPart(obj: BoardObject, aSnake: Snake) {
    const { x, y } = this._calculateTileCoordinates(obj, aSnake);
    return new BoardImageObject(
      this._imageLoader.image,
      x,
      y,
      SNAKE_TILE_WIDTH,
      SNAKE_TILE_HEIGHT,
      obj.x,
      obj.y,
      obj.width,
      obj.height,
    );
  }

  private _calculateTileCoordinates(obj: BoardObject, aSnake: Snake) {
    if (aSnake.body.head === obj) {
      return this._calculateHeadTileCoordinates(aSnake);
    } else if (aSnake.body.tail === obj) {
      return this._calculateTailTileCoordinates(aSnake);
    } else {
      return this._calculateBodyTileCoordinates(obj, aSnake);
    }
  }

  private _calculateHeadTileCoordinates(aSnake: Snake) {
    switch (aSnake.direction) {
      case Snake.DIRECTION_UP:
        return {
          x: HEAD_UP_TILE_X,
          y: HEAD_UP_TILE_Y,
        };
      case Snake.DIRECTION_RIGHT:
        return {
          x: HEAD_RIGHT_TILE_X,
          y: HEAD_RIGHT_TILE_Y,
        };
      case Snake.DIRECTION_DOWN:
        return {
          x: HEAD_DOWN_TILE_X,
          y: HEAD_DOWN_TILE_Y,
        };
      case Snake.DIRECTION_LEFT:
        return {
          x: HEAD_LEFT_TILE_X,
          y: HEAD_LEFT_TILE_Y,
        };
      default:
        return {
          x: HEAD_RIGHT_TILE_X,
          y: HEAD_RIGHT_TILE_Y,
        };
    }
  }

  private _calculateTailTileCoordinates(aSnake: Snake) {
    switch (aSnake.direction) {
      case Snake.DIRECTION_UP:
        return {
          x: TAIL_DOWN_TILE_X,
          y: TAIL_DOWN_TILE_Y,
        };
      case Snake.DIRECTION_RIGHT:
        return {
          x: TAIL_LEFT_TILE_X,
          y: TAIL_LEFT_TILE_Y,
        };
      case Snake.DIRECTION_DOWN:
        return {
          x: TAIL_UP_TILE_X,
          y: TAIL_UP_TILE_Y,
        };
      case Snake.DIRECTION_LEFT:
        return {
          x: TAIL_RIGHT_TILE_X,
          y: TAIL_RIGHT_TILE_Y,
        };
      default:
        return {
          x: TAIL_LEFT_TILE_X,
          y: TAIL_LEFT_TILE_Y,
        };
    }
  }

  private _calculateBodyTileCoordinates(obj: BoardObject, aSnake: Snake) {
    return {
      x: BODY_DOWN_TO_LEFT_TURN_TILE_X,
      y: BODY_DOWN_TO_LEFT_TURN_TILE_Y,
    };
  }
}
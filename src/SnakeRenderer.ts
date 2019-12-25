import Renderer from './Renderer';
import ImageLoader from './ImageLoader';
import * as S from './constants/snakeSprite';
import Snake from './Snake';
import BoardObject from './BoardObject';
import BoardImageObject from './BoardImageObject';
import Coordinates from './utils/Coordinates';

export default class SnakeRenderer {
  private _baseRenderer: Renderer;
  private _imageLoader: ImageLoader;
  private _snake: Snake;

  constructor(renderer: Renderer, snake: Snake) {
    this._baseRenderer = renderer;
    this._snake = snake;
    this._imageLoader = new ImageLoader(S.SNAKE_SPRITE_URL);
  }

  public render() {
    this._imageLoader.waitForImageToLoad().then(() => {
      const bodyParts: Array<BoardObject> = this._snake.visibleBodyPartsToArray();
      bodyParts.forEach((obj: BoardObject, index: number) => {
        this._baseRenderer.renderImage(this._transformSnakeBodyPart(
          obj,
          bodyParts[index - 1],
          bodyParts[index + 1],
        ));
      });
    });
  }

  private _transformSnakeBodyPart(
    curr: BoardObject,
    prev: BoardObject,
    next: BoardObject,
  ) {
    const tileCoords = this._calculateTileCoordinates(curr, prev, next);
    return new BoardImageObject(
      this._imageLoader.image,
      tileCoords.x,
      tileCoords.y,
      S.SNAKE_TILE_WIDTH,
      S.SNAKE_TILE_HEIGHT,
      curr.x,
      curr.y,
      curr.width,
      curr.height,
    );
  }

  private _calculateTileCoordinates(
    curr: BoardObject,
    prev: BoardObject,
    next: BoardObject,
  ) {
    let result;
    if (this._snake.body.head === curr) {
      result = this._calculateHeadTileCoordinates();
    } else if (next) {
      result = this._calculateBodyTileCoordinates(curr, prev, next);
    } else {
      result = this._calculateTailTileCoordinates(curr, prev);
    }
    return new Coordinates(result.x, result.y);
  }

  private _calculateHeadTileCoordinates() {
    switch (this._snake.direction) {
      case Snake.DIRECTION_UP:
        return {
          x: S.HEAD_UP_TILE_X,
          y: S.HEAD_UP_TILE_Y,
        };
      case Snake.DIRECTION_RIGHT:
        return {
          x: S.HEAD_RIGHT_TILE_X,
          y: S.HEAD_RIGHT_TILE_Y,
        };
      case Snake.DIRECTION_DOWN:
        return {
          x: S.HEAD_DOWN_TILE_X,
          y: S.HEAD_DOWN_TILE_Y,
        };
      case Snake.DIRECTION_LEFT:
        return {
          x: S.HEAD_LEFT_TILE_X,
          y: S.HEAD_LEFT_TILE_Y,
        };
      default:
        return {
          x: S.HEAD_RIGHT_TILE_X,
          y: S.HEAD_RIGHT_TILE_Y,
        };
    }
  }

  private _calculateTailTileCoordinates(
    curr: BoardObject,
    prev: BoardObject,
  ) {
    if (isUp()) {
      return {
        x: S.TAIL_UP_TILE_X,
        y: S.TAIL_UP_TILE_Y,
      }
    }
    if (isRight()) {
      return {
        x: S.TAIL_RIGHT_TILE_X,
        y: S.TAIL_RIGHT_TILE_Y,
      };
    }
    if (isDown()) {
      return {
        x: S.TAIL_DOWN_TILE_X,
        y: S.TAIL_DOWN_TILE_Y,
      };
    }
    if (isLeft()) {
      return {
        x: S.TAIL_LEFT_TILE_X,
        y: S.TAIL_LEFT_TILE_Y,
      };
    }

    function isUp() {
      return (curr.x === prev.x)
        && (curr.y === prev.y - 1);
    }
    function isDown() {
      return (curr.x === prev.x)
        && (curr.y === prev.y + 1);
    }
    function isRight() {
      return (curr.x === prev.x + 1)
        && (curr.y === prev.y);
    }
    function isLeft() {
      return (curr.x === prev.x - 1)
        && (curr.y === prev.y);
    }
  }

  private _calculateBodyTileCoordinates(
    curr: BoardObject,
    prev: BoardObject,
    next: BoardObject,
  ) {
    if (isHorizontal()) {
      return {
        x: S.BODY_HORIZONTAL_TILE_X,
        y: S.BODY_HORIZONTAL_TILE_Y,
      };
    }
    if (isVertical()) {
      return {
        x: S.BODY_VERTICAL_TILE_X,
        y: S.BODY_VERTICAL_TILE_Y,
      };
    }
    if (isLeftToUpTurn() || isDownToRightTurn()) {
      return {
        x: S.BODY_LEFT_TO_UP_TURN_TILE_X,
        y: S.BODY_LEFT_TO_UP_TURN_TILE_Y,
      };
    }
    if (isUpToRightTurn() || isLeftToDownTurn()) {
      return {
        x: S.BODY_UP_TO_RIGHT_TURN_TILE_X,
        y: S.BODY_UP_TO_RIGHT_TURN_TILE_Y,
      };
    }
    if (isRightToDownTurn() || isUpToLeftTurn()) {
      return {
        x: S.BODY_RIGHT_TO_DOWN_TURN_TILE_X,
        y: S.BODY_RIGHT_TO_DOWN_TURN_TILE_Y,
      };
    }
    if (isDownToLeftTurn() || isRightToUpTurn()) {
      return {
        x: S.BODY_DOWN_TO_LEFT_TURN_TILE_X,
        y: S.BODY_DOWN_TO_LEFT_TURN_TILE_Y,
      };
    }

    function isHorizontal() {
      return (
        ((curr.x === prev.x + 1) && (curr.x === next.x - 1))
        || ((curr.x === prev.x - 1) && (curr.x === next.x + 1))
      );
    }
    function isVertical() {
      return (
        ((curr.y === prev.y + 1) && (curr.y === next.y - 1))
        || ((curr.y === prev.y - 1) && (curr.y === next.y + 1))
      );
    }
    function isLeftToUpTurn() {
      return (curr.x === next.x - 1)
        && (curr.y === next.y)
        && (curr.x === prev.x)
        && (curr.y === prev.y + 1);
    }
    function isUpToRightTurn() {
      return (curr.x === next.x)
        && (curr.y === next.y - 1)
        && (curr.x === prev.x - 1)
        && (curr.y === prev.y);
    }
    function isRightToDownTurn() {
      return (curr.x === next.x + 1)
        && (curr.y === next.y)
        && (curr.x === prev.x)
        && (curr.y === prev.y - 1);
    }
    function isLeftToDownTurn() {
      return (curr.x === next.x - 1)
        && (curr.y === next.y)
        && (curr.x === prev.x)
        && (curr.y === prev.y - 1);
    }
    function isDownToLeftTurn() {
      return (curr.x === next.x)
        && (curr.y === next.y + 1)
        && (curr.x === prev.x + 1)
        && (curr.y === prev.y);
    }
    function isUpToLeftTurn() {
      return (curr.x === next.x)
        && (curr.y === next.y - 1)
        && (curr.x === prev.x + 1)
        && (curr.y === prev.y);
    }
    function isRightToUpTurn() {
      return (curr.x === next.x + 1)
        && (curr.y === next.y)
        && (curr.x === prev.x)
        && (curr.y === prev.y + 1);
    }
    function isDownToRightTurn() {
      return (curr.x === next.x)
        && (curr.y === next.y + 1)
        && (curr.x === prev.x - 1)
        && (curr.y === prev.y);
    }
  }
}
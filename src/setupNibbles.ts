import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import Snake from './Snake';
import Target from './Target';
import {
  CELL_WIDTH,
  CELL_HEIGHT,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  LAST_CELL_INDEX_BY_HEIGHT,
  LAST_CELL_INDEX_BY_WIDTH
} from './constants/common';
import PubSub from './utils/PubSub';
import TargetRenderer from './TargetRenderer';
import SnakeRenderer from './SnakeRenderer';
import BoardColoredObject from './BoardColoredObject';

export default function setup(container: HTMLElement) {
  const aRenderer = new Renderer(container);
  const board = new BoardColoredObject(0, 0, BOARD_WIDTH, BOARD_HEIGHT, '#FFE4E1');
  const aSnake = new Snake(
    [
      new BoardObject(2, 2, CELL_WIDTH, CELL_HEIGHT),
      new BoardObject(1, 2, CELL_WIDTH, CELL_HEIGHT),
    ],
    undefined,
    0
  );
  const aTarget = new Target(4, 4, CELL_WIDTH, CELL_HEIGHT, 25);
  const aSnakeRenderer = new SnakeRenderer(aRenderer, aSnake);
  const aTargetRenderer = new TargetRenderer(aRenderer, aTarget);
  const walls = [
    new BoardColoredObject(0, 0, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
    new BoardColoredObject(0, LAST_CELL_INDEX_BY_HEIGHT, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
    new BoardColoredObject(LAST_CELL_INDEX_BY_WIDTH, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
    new BoardColoredObject(0, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
  ];
  const aPubSub = new PubSub();
  const aNibbles = new Nibbles(
    aRenderer,
    board,
    aSnake,
    aTarget,
    walls,
    aPubSub,
    aTargetRenderer,
    aSnakeRenderer,
  );
  return {
    aNibbles,
    aSnake,
    aPubSub,
  };
}
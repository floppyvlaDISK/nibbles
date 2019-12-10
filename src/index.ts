import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import GameController from './GameController';
import Snake from './Snake';
import Target from './Target';
import { CELL_WIDTH, CELL_HEIGHT, BOARD_WIDTH, BOARD_HEIGHT } from './CONST';

// FIXME: This is getting out of hand
const container = document.getElementById('app-root');
const aRenderer = new Renderer(container);
const aSnake = new Snake(2, 2, CELL_WIDTH, CELL_HEIGHT, 'green', Snake.DIRECTION_RIGHT, 0);
const target = new Target(4, 4, CELL_WIDTH, CELL_HEIGHT, 'red', 25);
const walls = [
  // FIXME: 19 - last cell index
  new BoardObject(0, 0, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
  new BoardObject(0, 19, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
  new BoardObject(19, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
  new BoardObject(0, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
];
const aNibbles = new Nibbles(aRenderer, aSnake, target, walls);
const aGameController = new GameController(aNibbles);

aGameController.exec();
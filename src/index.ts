import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import GameController from './GameController';
import Snake from './Snake';
import Target from './Target';
import {
  CELL_WIDTH,
  CELL_HEIGHT,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  LAST_CELL_INDEX_BY_HEIGHT,
  LAST_CELL_INDEX_BY_WIDTH
} from './CONST';
import PubSub from './utils/PubSub';
import ScoreDashboard from './ScoreDashboard';

const aRenderer = new Renderer(document.getElementById('nibbles'));
const board = new BoardObject(0, 0, BOARD_WIDTH, BOARD_HEIGHT, '#FFE4E1');
const aSnake = new Snake(
  new BoardObject(2, 2, CELL_WIDTH, CELL_HEIGHT, 'green'),
  undefined,
  0
);
const target = new Target(4, 4, CELL_WIDTH, CELL_HEIGHT, 'red', 25);
const walls = [
  new BoardObject(0, 0, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
  new BoardObject(0, LAST_CELL_INDEX_BY_HEIGHT, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
  new BoardObject(LAST_CELL_INDEX_BY_WIDTH, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
  new BoardObject(0, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
];
const aPubSub = new PubSub();
const aNibbles = new Nibbles(
  aRenderer,
  board,
  aSnake,
  target,
  walls,
  aPubSub
);
const aGameController = new GameController(aNibbles);
const aScoreDashboard = new ScoreDashboard(document.getElementById('score-board'));

aPubSub.subscribe('SnakeScoreChanged', aScoreDashboard.render);
aScoreDashboard.render(aSnake.score);
aGameController.exec();

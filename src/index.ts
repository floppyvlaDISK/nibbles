import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import GameController from './GameController';
import Snake from './Snake';
import Target from './Target';
import { CELL_WIDTH, CELL_HEIGHT, BOARD_WIDTH, BOARD_HEIGHT } from './CONST';
import PubSub from './utils/PubSub';
import ScoreDashboard from './ScoreDashboard';

const aRenderer = new Renderer(document.getElementById('nibbles'));
const board = new BoardObject(0, 0, BOARD_WIDTH, BOARD_HEIGHT, '#FFE4E1');
const aSnake = new Snake(2, 2, CELL_WIDTH, CELL_HEIGHT, 'green', Snake.DIRECTION_RIGHT, 0);
const target = new Target(4, 4, CELL_WIDTH, CELL_HEIGHT, 'red', 25);
const walls = [
  // FIXME: 19 - last cell index
  new BoardObject(0, 0, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
  new BoardObject(0, 19, BOARD_WIDTH, CELL_HEIGHT, 'pink'),
  new BoardObject(19, 0, CELL_WIDTH, BOARD_HEIGHT, 'pink'),
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

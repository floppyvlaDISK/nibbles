import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import GameController from './GameController';
import Snake from './Snake';
import Target from './Target';

const container = document.getElementById('app-root');
const aRenderer = new Renderer(container);
const aSnake = new Snake(80, 80, 40, 40, 'green', Snake.DIRECTION_RIGHT, 0);
const target = new Target(480, 480, 40, 40, 'red', 25);
const walls = [
  new BoardObject(0, 0, 800, 40, 'pink'),
  new BoardObject(760, 0, 40, 800, 'pink'),
  new BoardObject(0, 760, 800, 40, 'pink'),
  new BoardObject(0, 0, 40, 800, 'pink'),
];
const aNibbles = new Nibbles(aRenderer, aSnake, target, walls);
const aGameController = new GameController(aNibbles);

aGameController.exec();
import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import GameController from './GameController';
import Snake from './Snake';

const container = document.getElementById('app-root');
const aRenderer = new Renderer(container);
const aSnake = new Snake(80, 80, 40, 40, 'green', Snake.DIRECTION_RIGHT);
const target = new BoardObject({ x: 480, y: 480, width: 40, height: 40, color: 'red' });
const walls = [
  new BoardObject({ x: 0, y: 0, width: 800, height: 40, color: 'pink' }),
  new BoardObject({ x: 760, y: 0, width: 40, height: 800, color: 'pink' }),
  new BoardObject({ x: 0, y: 760, width: 800, height: 40, color: 'pink' }),
  new BoardObject({ x: 0, y: 0, width: 40, height: 800, color: 'pink' }),
]
const aNibbles = new Nibbles(aRenderer, aSnake, target, walls);
const aGameControls = new GameController(aNibbles);

aGameControls.exec();
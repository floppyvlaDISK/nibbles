import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';
import GameController from './GameController';
import Snake from './Snake';

const container = document.getElementById('app-root');
const aRenderer = new Renderer(container);
const aSnake = new Snake(50, 50, 40, 40, 'green', Snake.DIRECTION_RIGHT);
const aTarget = new BoardObject(500, 500, 40, 40, 'red');
const aNibbles = new Nibbles(aRenderer, aSnake, aTarget);
const aGameControls = new GameController(aNibbles);

aGameControls.exec();
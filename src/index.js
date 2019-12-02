import Nibbles from './Nibbles';
import Renderer from './Renderer';
import BoardObject from './BoardObject';

const container = document.getElementById('app-root');
const aRenderer = new Renderer(container);
const aSnake = new BoardObject(50, 50, 40, 40, 'green');
const aTarget = new BoardObject(500, 500, 40, 40, 'red');
const aNibbles = new Nibbles(aRenderer, aSnake, aTarget);
aNibbles.render();
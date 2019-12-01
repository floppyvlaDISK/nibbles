import Nibbles from './Nibbles';
import Renderer from './Renderer';

const container = document.getElementById('app-root');
const aRenderer = new Renderer(container);
const aNibbles = new Nibbles(aRenderer, null, null);
aNibbles.render();
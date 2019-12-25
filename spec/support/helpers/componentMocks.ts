import PubSub from '../../../src/utils/PubSub';
import BoardObject from '../../../src/BoardObject';
import Snake from '../../../src/Snake';
import Target from '../../../src/Target';
import { CELL_WIDTH, CELL_HEIGHT } from '../../../src/constants/common';

export function createRendererMock() {
  return jasmine.createSpyObj(
    'Renderer',
    ['renderImage', 'render']
  );
}

export function createPubSubMock() {
  const result = new PubSub();
  spyOn(result, 'publish');
  return result;
}

export function createSnakeMock({
  body = [new BoardObject(1, 1)],
  direction = Snake.DIRECTION_RIGHT,
  score = 25,
}: {
  body?: Array<BoardObject>,
  direction?: string,
  score?: number,
}) {
  const result = new Snake(body, direction, score);
  spyOn(result, 'move').and.callThrough();
  spyOn(result, 'die').and.callThrough();
  spyOn(result, 'eat').and.callThrough();
  spyOn(result, 'canEat').and.callThrough();
  return result;
}

export function createTargetMock({
  x = 4,
  y = 4,
  value = 25,
}: {
  x?: number,
  y?: number,
  value?: number
}) {
  const result = new Target(x, y, CELL_WIDTH, CELL_HEIGHT, value);
  spyOnProperty(result, 'value').and.callThrough();
  return result;
}

export function createNibblesMock() {
  return jasmine.createSpyObj(
    'Nibbles',
    ['render', 'start', 'setSnakeDirectionFromKeyCode']
  );
}

export function createContainerMock() {
  return jasmine.createSpyObj(
    'container',
    ['appendChild'],
  );
}
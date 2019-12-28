import BoardObject from '../../../src/BoardObject';
import Snake from '../../../src/Snake';

export function flushPromise() {
  return Promise.resolve();
}

export async function loadSnakeSprite() {
  jasmine.clock().tick(50);
  await flushPromise();
}

export function fireKeybordEvent(eventInitDict = {}) {
  const event = new KeyboardEvent('keydown', eventInitDict);
  document.body.dispatchEvent(event);
}

export function createContainer() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

export function createSnake({
  body = [new BoardObject(1, 1)],
  direction = Snake.DIRECTION_RIGHT,
  score = 25,
}: {
  body?: Array<BoardObject>,
  direction?: string,
  score?: number,
}) {
  return new Snake(body, direction, score);
}

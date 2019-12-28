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
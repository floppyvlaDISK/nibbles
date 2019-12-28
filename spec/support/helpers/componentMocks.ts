export function createRendererMock() {
  return jasmine.createSpyObj(
    'Renderer',
    ['renderImage', 'render']
  );
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
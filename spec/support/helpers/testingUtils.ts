export function flushPromise() {
  return Promise.resolve();
}

export async function loadSnakeSprite() {
  jasmine.clock().tick(50);
  await flushPromise();
}
import Snake from "../src/Snake";

describe('Snake', () => {
  it('move() decreases y coordinate if direction is up', () => {
    const aSnake = new Snake(100, 100, 40, 40, 'red', Snake.DIRECTION_UP);

    aSnake.move();

    expect(aSnake.y).toBe(60);
    expect(aSnake.x).toBe(100);
  });

  it('move() increases x coordinate if direction is right', () => {
    const aSnake = new Snake(100, 100, 40, 40, 'red', Snake.DIRECTION_RIGHT);

    aSnake.move();

    expect(aSnake.y).toBe(100);
    expect(aSnake.x).toBe(140);
  });

  it('move() increases y coordinate if direction is down', () => {
    const aSnake = new Snake(100, 100, 40, 40, 'red', Snake.DIRECTION_DOWN);

    aSnake.move();

    expect(aSnake.y).toBe(140);
    expect(aSnake.x).toBe(100);
  });

  it('move() descreases x coordinate if direction is left', () => {
    const aSnake = new Snake(100, 100, 40, 40, 'red', Snake.DIRECTION_LEFT);

    aSnake.move();

    expect(aSnake.y).toBe(100);
    expect(aSnake.x).toBe(60);
  });
});
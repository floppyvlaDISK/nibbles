const ARRROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const ARROW_LEFT = 37;

export default function isArrowKey(code) {
  return [
    ARRROW_UP,
    ARROW_RIGHT,
    ARROW_DOWN,
    ARROW_LEFT,
  ].includes(code);
}
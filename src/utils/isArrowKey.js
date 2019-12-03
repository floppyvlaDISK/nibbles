export const ARRROW_UP = 38;
export const ARROW_RIGHT = 39;
export const ARROW_DOWN = 40;
export const ARROW_LEFT = 37;

export default function isArrowKey(code) {
  return [
    ARRROW_UP,
    ARROW_RIGHT,
    ARROW_DOWN,
    ARROW_LEFT,
  ].includes(code);
}
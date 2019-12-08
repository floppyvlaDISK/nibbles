export const ARROW_UP: number = 38;
export const ARROW_RIGHT: number = 39;
export const ARROW_DOWN: number = 40;
export const ARROW_LEFT: number = 37;

export default function isArrowKey(code: number) {
  return [
    ARROW_UP,
    ARROW_RIGHT,
    ARROW_DOWN,
    ARROW_LEFT,
  ].includes(code);
}
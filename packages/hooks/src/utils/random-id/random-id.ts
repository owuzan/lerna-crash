export function randomId() {
  return `piksel-ui-${Math.random().toString(36).slice(2, 11)}`;
}

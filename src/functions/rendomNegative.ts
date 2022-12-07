export function rendomNegative() {
  const odd = Math.trunc(Math.random() * 3) / 2;
  return odd ? -1 : 1;
}

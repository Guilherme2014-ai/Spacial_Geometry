import { rendomNegative } from "./rendomNegative";

export function randomSpeedAxis() {
  return 20 + Math.random() * 20 * rendomNegative();
}

import { scene } from "..";
import { AstronomicalObject } from "../entities/AstronomicalObject";

export function addAstronomicalObjectFunctionality(
  astronomicalObjects: AstronomicalObject[],
  color?: string
) {
  window.addEventListener("keypress", (e) => {
    const key = e.key;

    if (key === "a") {
      const object = new AstronomicalObject(10 + Math.random() * 20, color);

      scene.add(object.Model3D);
      astronomicalObjects.push(object);
    }
  });
}

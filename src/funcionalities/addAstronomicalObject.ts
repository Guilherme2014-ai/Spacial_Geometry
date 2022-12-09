/* eslint-disable @typescript-eslint/no-explicit-any */
import { scene } from "..";
import { AstronomicalObject } from "../entities/AstronomicalObject";

export function addAstronomicalObjectFunctionality(
  astronomicalObjects: AstronomicalObject[],
  color?: string
) {
  window.addEventListener("keypress", (e) => {
    const key = e.key;

    if (key == "m" || key == "a") {
      const velocity = key == "m" ? 0.0000000001 : undefined;

      const mass = key == "m" ? 500 : Number(prompt("Mass. Ex: 20"));
      const distance = key == "m" ? 0 : Number(prompt("distance. Ex: 900"));

      const object = new AstronomicalObject(
        mass || 10,
        color,
        velocity,
        velocity,
        velocity
      );
      object.Model3D.position.y = distance;

      scene.add(object.Model3D);
      astronomicalObjects.push(object);
    }
  });
}

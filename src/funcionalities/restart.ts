import { scene } from "..";
import { AstronomicalObject } from "../entities/AstronomicalObject";

export function restart(astronomicalObjects: AstronomicalObject[]) {
  window.addEventListener("keypress", (e) => {
    const key = e.key;

    console.log(scene);

    if (key === "r")
      astronomicalObjects.forEach((object) => {
        object.destroy(astronomicalObjects, scene);
      });
  });
}

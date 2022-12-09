import { AstronomicalObject } from "../entities/AstronomicalObject";

export function colision(
  astronomicalObjects: AstronomicalObject[],
  scene: THREE.Scene
) {
  astronomicalObjects.forEach((object) => {
    astronomicalObjects.forEach((_object) => {
      if (object.id != _object.id) {
        const colisionLimitDistance = object.mass + _object.mass;
        const distance = object.getDistances(
          _object.Model3D.position
        ).distanceBetwenn;

        if (distance <= colisionLimitDistance) {
          if (object.mass < _object.mass) {
            object.destroy(astronomicalObjects, scene);
          } else {
            _object.destroy(astronomicalObjects, scene);
          }
        }
      }
    });
  });
}

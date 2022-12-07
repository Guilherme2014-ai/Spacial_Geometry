import * as THREE from "three";
import { AstronomicalObject } from "./entities/AstronomicalObject";
import { addAstronomicalObjectFunctionality } from "./funcionalities/addAstronomicalObject";

const AstronomicalObjects: AstronomicalObject[] = [];

export function animate(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) {
  gravitationalAttractHandler();
  moveObjectHandler();

  renderer.render(scene, camera);

  requestAnimationFrame(() => {
    animate(renderer, scene, camera);
  });
}

addAstronomicalObjectFunctionality(AstronomicalObjects);

function gravitationalAttractHandler() {
  AstronomicalObjects.forEach((object) => {
    object.attract(AstronomicalObjects);
  });
}

function moveObjectHandler() {
  AstronomicalObjects.forEach((object) => {
    object.moveObject();
  });
}

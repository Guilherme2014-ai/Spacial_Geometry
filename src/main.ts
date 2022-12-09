/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { scene } from ".";
import { AstronomicalObject } from "./entities/AstronomicalObject";
import { addAstronomicalObjectFunctionality } from "./funcionalities/addAstronomicalObject";
import { restart } from "./funcionalities/restart";
import { colision } from "./rules/colision";

const AstronomicalObjects: AstronomicalObject[] = [];

export function animate(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) {
  gravitationalAttractHandler();
  moveObjectHandler();
  colisionHandler();

  renderer.render(scene, camera);

  requestAnimationFrame(() => {
    animate(renderer, scene, camera);
  });
}

addAstronomicalObjectFunctionality(AstronomicalObjects);
restart(AstronomicalObjects);
// tutorial();

function gravitationalAttractHandler() {
  AstronomicalObjects.forEach((object) => {
    object.attract(AstronomicalObjects);
  });
}

function colisionHandler() {
  colision(AstronomicalObjects, scene);
}

function moveObjectHandler() {
  AstronomicalObjects.forEach((object) => {
    object.moveObject();
  });
}

function tutorial() {
  let counter = 0;
  const content = {
    welcome: {
      portuguese: "Bem-Vindo ao Simulador de Gravidade 3D",
      english: "Welcome to the Gravity Simulator 3D",
    },
    tutorials: [
      {
        portuguese: `Para Adicionar uma massa central aperte "m"`,
        english: `Press "m" to add a central mass`,
      },
      {
        portuguese: `Para adicionar corpos em movimento aperte "a", logo em seguida escolha a massa do próprio`,
        english: `Press "a" to add moving objects, after that, choose the object's mass`,
      },
      {
        portuguese: `Para restaurar o estado, aperte "r"`,
        english: `Press "r" to restart`,
      },
      {
        portuguese: `Tutorial feito. Aproveite !`,
        english: `Tutorial Done. Have Fun !`,
      },
    ],
  } as any;

  const language = confirm(`Portugues(Ok)   English(Cancel)`)
    ? "portuguese"
    : "english"; // pt - en

  alert(content.welcome[language]);
  diplayTutorial();

  function diplayTutorial() {
    alert(content.tutorials[counter][language]);

    setTimeout(() => {
      counter++;
      diplayTutorial();
    }, 3000);
  }
}

export { AstronomicalObjects };

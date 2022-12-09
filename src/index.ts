import * as THREE from "three";
import { animate } from "./main";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// CSS
import "./index.scss";

const scene = new THREE.Scene();
const element = document.getElementById("content") as HTMLDivElement;

const ambientLight = new THREE.AmbientLight("white");
const light01 = new THREE.PointLight();

light01.position.set(10, 10, 10);

scene.add(ambientLight);
scene.add(light01);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100000
);
camera.position.z = 1800;
camera.position.x = 1800;
camera.position.y = 1800;

const renderer = new THREE.WebGLRenderer();
new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
element.appendChild(renderer.domElement);

animate(renderer, scene, camera);

export { scene };

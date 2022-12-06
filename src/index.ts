import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// CSS
import "./index.scss";

const scene = new THREE.Scene();
const element = document.getElementById("content") as HTMLDivElement;

const axes = new THREE.AxesHelper(45);
const ambientLight = new THREE.AmbientLight("white");

const circle = new THREE.Mesh(
  new THREE.SphereGeometry(10),
  new THREE.MeshLambertMaterial({ color: "red" })
);

const thirdBall = new THREE.Mesh(
  new THREE.SphereGeometry(7),
  new THREE.MeshLambertMaterial({ color: "blue" })
);
thirdBall.position.x = -150;
thirdBall.position.z = -180;

scene.add(axes);
scene.add(circle);
scene.add(thirdBall);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 60;
camera.position.x = 25;
camera.position.y = 280;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
element.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(() => {
    renderer.render(scene, camera);
    animate();
  });

  moveThird();
}

animate();

function moveThird() {
  const force = 1;
  const { cosCoeficient, sinCoeficient } = relativeAngle(
    thirdBall.position,
    circle.position
  );

  console.log(`force: ${force}`);
  thirdBall.position.x += force * cosCoeficient;
  thirdBall.position.z += force * sinCoeficient;
}

function relativeAngle(elemPos01: THREE.Vector3, elemPos02: THREE.Vector3) {
  const getDelta = (x1: number, x2: number) => {
    const result = x1 - x2;
    return result > 0 ? result : -1 * result;
  };

  const catetAd = getDelta(elemPos01.x, elemPos02.x);
  const catetOp = getDelta(elemPos01.z, elemPos02.z);

  const distanceBetwenn = Math.sqrt(catetAd ** 2 + catetOp ** 2);
  console.log(`Distance: ${distanceBetwenn}`);

  const sinCoeficient = catetOp / distanceBetwenn;
  const cosCoeficient = catetAd / distanceBetwenn;

  return { sinCoeficient, cosCoeficient };
}

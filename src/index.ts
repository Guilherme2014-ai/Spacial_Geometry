import * as THREE from "three";
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
thirdBall.position.x = -280;
thirdBall.position.z = 90;
thirdBall.position.y = -280;

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

let force = 0;

function animate() {
  requestAnimationFrame(() => {
    renderer.render(scene, camera);
    animate();
  });

  thirdBallSelfSpeed();
  moveThird();
}

animate();

function thirdBallSelfSpeed() {
  thirdBall.position.x += 2;
  thirdBall.position.y += 5;
  thirdBall.position.z += 2;
}

setInterval(() => {
  force += 0.1;
}, 100);

function moveThird() {
  const { forceX, forceZ, forceY } = relativeAngle(
    thirdBall.position,
    circle.position
  );

  const { directionX, directionY, directionZ } = getDirections(
    thirdBall.position,
    circle.position
  );

  const x = force * forceX * directionX;
  const y = force * forceY * directionY;
  const z = force * forceZ * directionZ;

  if (forceX === 0 || forceZ === 0) console.log("quase");

  thirdBall.position.x += x;
  thirdBall.position.y += y;
  thirdBall.position.z += z;
}

function relativeAngle(elemPos01: THREE.Vector3, elemPos02: THREE.Vector3) {
  const getDelta = (x1: number, x2: number) => {
    const result = x1 - x2;
    return result > 0 ? result : -1 * result;
  };

  const catetAd = getDelta(elemPos01.x, elemPos02.x);
  const catetOp = getDelta(elemPos01.z, elemPos02.z);
  const catetOpH = getDelta(elemPos01.y, elemPos02.y);

  const distanceBetwenn = Math.sqrt(catetAd ** 2 + catetOp ** 2);
  const distanceBetwenn3DAngle = Math.sqrt(
    catetOpH ** 2 + distanceBetwenn ** 2
  );

  const forceZ = catetOp / distanceBetwenn;
  const forceX = catetAd / distanceBetwenn;
  const forceY = catetOpH / distanceBetwenn3DAngle;

  return { forceZ, forceX, forceY };
}

function getDirections(elemPos01: THREE.Vector3, elemPos02: THREE.Vector3) {
  const directionX = elemPos01.x < elemPos02.x ? 1 : -1;
  const directionY = elemPos01.y < elemPos02.y ? 1 : -1;
  const directionZ = elemPos01.z < elemPos02.z ? 1 : -1;

  return { directionX, directionY, directionZ };
}

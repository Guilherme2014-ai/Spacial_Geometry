/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { idUniqueV2 } from "id-unique-protocol";
import { randomSpeedAxis } from "../functions/randomSpeedAxis";

const colors = ["red", "blue", "yellow", "purple", "green"];

export class AstronomicalObject {
  constructor(
    public mass: number,
    private color?: string,
    private speedX?: number,
    private speedY?: number,
    private speedZ?: number
  ) {}

  public id = idUniqueV2();
  public Model3D = new THREE.Mesh(
    new THREE.SphereGeometry(this.mass),
    new THREE.MeshLambertMaterial({
      color: this.color
        ? this.color
        : colors[Math.trunc(Math.random() * colors.length)],
    })
  );

  private speedAxisX = this.speedX || randomSpeedAxis();
  private speedAxisY = this.speedY || 2;
  private speedAxisZ = this.speedZ || randomSpeedAxis();

  private workingForces = {} as any;

  attract(objects: AstronomicalObject[]) {
    objects.forEach((object) => {
      if (object.id != this.id) {
        const objectPosition = object.Model3D.position;

        const { distanceBetwenn } = this.getDistances(objectPosition);
        const currentIncrease = this.getGravitationalForce(distanceBetwenn);

        if (!this.workingForces[`${object.id}`])
          this.workingForces[`${object.id}`] = 0;

        this.workingForces[`${object.id}`] += currentIncrease;

        const force = this.workingForces[`${object.id}`];

        const { directionX, directionY, directionZ } =
          this.getDirections(objectPosition);
        const { forceX, forceY, forceZ } = this.getFactoredForces(
          force,
          objectPosition
        ); // Force --> Force Destribuction

        const vetorForceX = forceX * directionX;
        const vetorForceY = forceY * directionY;
        const vetorForceZ = forceZ * directionZ;

        object.setSpeedAxisX(vetorForceX);
        object.setSpeedAxisY(vetorForceY);
        object.setSpeedAxisZ(vetorForceZ);
      }
    });
  }

  destroy(objects: AstronomicalObject[], scene: THREE.Scene) {
    let elemIdx = 0;

    objects.forEach((object, idx) => {
      if (object.id === this.id) elemIdx = idx;
    });

    scene.remove(this.Model3D);
    objects.length > 1 ? objects.splice(elemIdx, elemIdx) : objects.shift();
  }

  setSpeedAxisX(value: number) {
    this.speedAxisX += value;
  }
  setSpeedAxisY(value: number) {
    this.speedAxisY += value;
  }
  setSpeedAxisZ(value: number) {
    this.speedAxisZ += value;
  }

  getFactoredForces(fullForce: number, otherObjectPosition: THREE.Vector3) {
    const {
      deltaX,
      deltaY,
      deltaZ,
      distanceBetwennBiDimension,
      distanceBetwenn,
    } = this.getDistances(otherObjectPosition);
    const getFactoretedForce = (intencivity: number) => intencivity * fullForce;

    const forceX = getFactoretedForce(deltaX / distanceBetwennBiDimension);
    const forceY = getFactoretedForce(deltaY / distanceBetwenn);
    const forceZ = getFactoretedForce(deltaZ / distanceBetwennBiDimension);

    return { forceX, forceY, forceZ };
  }

  getGravitationalForce(distance: number) {
    const force = this.mass / distance;

    return force / 230;
  }

  getDirections(otherObjectPosition: THREE.Vector3) {
    const directionX = this.Model3D.position.x < otherObjectPosition.x ? -1 : 1;
    const directionY = this.Model3D.position.y < otherObjectPosition.y ? -1 : 1;
    const directionZ = this.Model3D.position.z < otherObjectPosition.z ? -1 : 1;

    return { directionX, directionY, directionZ };
  }

  getDistances(otherObjectPosition: THREE.Vector3) {
    const deltaX = this.getDelta(
      this.Model3D.position.x,
      otherObjectPosition.x
    );
    const deltaY = this.getDelta(
      this.Model3D.position.y,
      otherObjectPosition.y
    );
    const deltaZ = this.getDelta(
      this.Model3D.position.z,
      otherObjectPosition.z
    );

    const distanceBetwennBiDimension = Math.sqrt(deltaX ** 2 + deltaZ ** 2);
    const distanceBetwenn = Math.sqrt(
      deltaY ** 2 + distanceBetwennBiDimension ** 2
    );

    return {
      distanceBetwenn,
      distanceBetwennBiDimension,
      deltaX,
      deltaY,
      deltaZ,
    };
  }

  getDelta(x1: number, x2: number) {
    const result = x1 - x2;
    return result > 0 ? result : -1 * result;
  }
  moveObject() {
    this.Model3D.position.x += this.speedAxisX;
    this.Model3D.position.y += this.speedAxisY;
    this.Model3D.position.z += this.speedAxisZ;
  }
}

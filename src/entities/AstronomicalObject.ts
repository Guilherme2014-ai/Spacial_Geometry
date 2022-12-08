/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { idUniqueV2 } from "id-unique-protocol";
import { rendomNegative } from "../functions/rendomNegative";

const colors = ["red", "blue", "yellow", "purple", "green"];

export class AstronomicalObject {
  constructor(public mass: number, private color?: string) {}

  public id = idUniqueV2();
  public Model3D = new THREE.Mesh(
    new THREE.SphereGeometry(this.mass),
    new THREE.MeshLambertMaterial({
      color: this.color
        ? this.color
        : colors[Math.trunc(Math.random() * colors.length)],
    })
  );

  private speedAxisX = Math.random() * 2 * rendomNegative();
  private speedAxisY = Math.random() * 3 * rendomNegative();
  private speedAxisZ = Math.random() * 4 * rendomNegative();

  private workingForces = {} as any;

  attract(objects: AstronomicalObject[]) {
    objects.forEach((object) => {
      if (object.id != this.id) {
        const objectPosition = object.Model3D.position;

        const { distanceBetwenn } = this.getDistances(objectPosition);
        const currentIncrease = this.getGravitationalForce(
          distanceBetwenn,
          object.mass
        );

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

  getGravitationalForce(distance: number, otherObjectMass: number) {
    const force = (otherObjectMass * this.mass) / distance ** 2;

    return force / 100;
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

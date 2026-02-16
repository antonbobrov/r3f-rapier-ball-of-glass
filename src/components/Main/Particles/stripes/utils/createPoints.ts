import {
  AdditiveBlending,
  BufferGeometry,
  InstancedBufferAttribute,
  InstancedMesh,
  MeshStandardMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
} from 'three';
import {
  instancedBufferAttribute,
  mx_noise_float,
  mx_fractal_noise_vec3,
  positionLocal,
  rotate,
  time,
  vec3,
} from 'three/tsl';

import { ISettings } from '../../types';

import { curlNoise } from './curlNoise';
import { generateStripesData } from './generateStripesData';

export function createPoints(settings: ISettings) {
  const isInstance = settings.kind === 'instancedMesh';

  const data = generateStripesData(settings);

  // Create buffer attributes
  const colors = new InstancedBufferAttribute(data.colors, 3);
  const positions = new InstancedBufferAttribute(data.positions, 4);
  const rotations = new InstancedBufferAttribute(data.rotations, 4);
  const distortions = new InstancedBufferAttribute(data.distortions, 4);

  const instanceColor = instancedBufferAttribute(colors);
  const instancePosition = instancedBufferAttribute(positions);
  const instanceRotation = instancedBufferAttribute(rotations);
  const instanceDistortion = instancedBufferAttribute(distortions);

  // Create geometry
  let geometry: BufferGeometry;
  if (isInstance) {
    geometry = new SphereGeometry(settings.instanceScale, 4, 4);
  } else {
    geometry = new BufferGeometry();
    geometry.setAttribute('position', positions);
    geometry.setAttribute('color', colors);
  }

  // Create material
  let material: MeshStandardMaterial | SpriteMaterial;
  if (isInstance) {
    material = new MeshStandardMaterial({
      color: 0xff00ff,
      metalness: 1,
      roughness: 0.5,
    });
  } else {
    material = new SpriteMaterial({
      sizeAttenuation: true,
      transparent: false,
    });
    material.scaleNode = instancePosition.w;
  }

  // Update color
  material.colorNode = instanceColor;
  material.depthWrite = true;

  // Blending
  if (settings.blendingMode === 'AdditiveBlending') {
    material.blending = AdditiveBlending;
  }

  // Calculate base position
  const offsetPosition = instancePosition.xyz;

  // Current time
  const currentTime = time.mul(instanceRotation.w);

  // Calculate rotation
  const motionRotation = vec3(
    instanceRotation.x,
    instanceRotation.y,
    instanceRotation.z.add(currentTime),
  );
  const rotatedCoords = settings.rotation
    ? rotate(offsetPosition, motionRotation)
    : offsetPosition;

  // Chaos
  const chaosAmp = instanceDistortion.w;
  const chaos = mx_noise_float(rotatedCoords.mul(20), chaosAmp.pow2());

  // Distortion: mx (gradient) or curl noise
  const curlRand = instanceDistortion.x;
  const curlStrength = instanceDistortion.y;
  const curlAmp = instanceDistortion.z;
  const curlCoord = rotatedCoords.add(curlRand).mul(curlStrength).add(chaos);
  const distortion = settings.distortion
    ? (settings.noiseType ?? 'curl') === 'curl'
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        curlNoise(curlCoord).mul(curlAmp)
      : mx_fractal_noise_vec3(curlCoord, settings.mxOctaves).mul(curlAmp)
    : 0;

  // Calculate final position
  const finalPosition = isInstance
    ? positionLocal.add(rotatedCoords).add(distortion)
    : rotatedCoords.add(distortion);

  // Apply position
  material.positionNode = finalPosition;

  // Create points
  let points: InstancedMesh | Sprite;
  if (isInstance) {
    points = new InstancedMesh(geometry, material, data.count);
  } else {
    points = new Sprite(material as SpriteMaterial);
  }
  points.count = data.count;

  // Destruct
  const destruct = () => {
    geometry.dispose();
    material.dispose();
  };

  return { points, destruct };
}

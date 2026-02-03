import { DoubleSide, MeshPhysicalMaterial } from 'three';

export const material = new MeshPhysicalMaterial({
  color: 0xeeefff,
  emissive: 0x000012,
  reflectivity: 0.2,
  roughness: 0.1,
  metalness: 0.1,
  transparent: true,
  opacity: 0.7,
  transmission: 1,
  thickness: 0.6,
  ior: 1.4,
  dispersion: 2.5,
  side: DoubleSide,
});

import { useMemo } from 'react';

import { DoubleSide, MeshPhysicalMaterial } from 'three';

import { OPACITY } from '../settings';

export function useModelMaterial() {
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: 0xeeefff,
        emissive: 0x000012,
        reflectivity: 0.2,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: OPACITY,
        transmission: 1,
        thickness: 0.6,
        ior: 1.4,
        dispersion: 2.5,
        side: DoubleSide,
      }),
    [],
  );

  return material;
}

import { Color } from 'three';

import { mulberryRand } from '@/utils/mulberry32';

import { ISettings } from '../../types';

function thicknessAtPosition(t: number, peak: number): number {
  return t <= peak
    ? Math.sin((Math.PI * 0.5 * t) / peak)
    : Math.sin((Math.PI * 0.5 * (1 - t)) / (1 - peak));
}

export function generateStripesData(settings: ISettings) {
  const colorsArray: number[] = [];
  const positionsArray: number[] = [];
  const rotationsArray: number[] = [];
  const distortions: number[] = [];

  settings.instances.forEach((instance) => {
    if (!instance.visible) {
      return;
    }

    const { count, thicknessPeak } = instance;

    const color = new Color(instance.color);

    for (let index = 0; index < count; index++) {
      const radius = mulberryRand(
        instance.radiusMin,
        instance.radiusMax,
        index,
      );
      const arcPart = mulberryRand(
        instance.arcMin,
        instance.arcMax,
        instance.arcRand + index,
      );

      const population = instance.density * arcPart;

      const rotationRand = instance.rotationRand + index;
      const rotationDir = Math.sign(mulberryRand(-1, 1, rotationRand)) || 1;
      const rotation = [
        mulberryRand(0, Math.PI * 2, rotationRand) * rotationDir,
        mulberryRand(0, Math.PI * 2, rotationRand * 0.75) * rotationDir,
        mulberryRand(0, Math.PI * 2, rotationRand * 0.5) * rotationDir,
      ];

      const phiCenter = Math.PI * 2 * (index / count);

      const peak = Math.max(0, Math.min(1, thicknessPeak));

      for (let pointIndex = 0; pointIndex < population; pointIndex += 1) {
        const t = pointIndex / (population - 1);

        const thetaT = 0.5 + (t - 0.5) * arcPart;
        const theta = thetaT * Math.PI;
        const sinTheta = Math.sin(theta);

        const centerWeight = thicknessAtPosition(t, peak);
        const spreadAmount =
          mulberryRand(-0.5, 0.5, index + pointIndex) *
          instance.thickness *
          centerWeight;
        const dPhi = spreadAmount / Math.max(sinTheta, 0.01);

        const phi = phiCenter + dPhi;

        const x = radius * sinTheta * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * sinTheta * Math.sin(phi);

        colorsArray.push(color.r, color.g, color.b);
        positionsArray.push(x, y, z, instance.pointScale);
        rotationsArray.push(...rotation, instance.speed);

        distortions.push(
          instance.curlRand + index,
          instance.curlStrength,
          1 - instance.radiusMax,
          instance.chaosAmp,
        );
      }
    }
  });

  return {
    count: colorsArray.length / 3,
    colors: new Float32Array(colorsArray),
    positions: new Float32Array(positionsArray),
    rotations: new Float32Array(rotationsArray),
    distortions: new Float32Array(distortions),
  };
}

import { Color } from 'three';

import { IInstance, ISettings } from './types';

export const BASE_INSTANCE: IInstance = {
  key: '0',
  visible: true,
  color: new Color(Math.random() * 0xffffff),
  count: 10,
  density: 500,
  radiusMin: 0.7,
  radiusMax: 0.9,
  arcMin: 0.1,
  arcMax: 0.2,
  arcRand: 0,
  speed: 1,
  rotationRand: 0,
  curlRand: 0,
  curlStrength: 4,
  chaosAmp: 0,
  thickness: 0.02,
  thicknessPeak: 0.5,
  pointScale: 0.006,
};

export const BASE_SETTINGS: ISettings = {
  kind: 'sprite',
  instanceScale: 0.006,
  rotation: true,
  distortion: true,
  noiseType: 'mx',
  mxOctaves: 1,
  blendingMode: 'NormalBlending',
  instances: [],
};

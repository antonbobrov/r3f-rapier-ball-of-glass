import { Color } from 'three';

export interface IInstance {
  key: string;
  color: number | Color;
  visible: boolean;
  count: number;
  density: number;
  radiusMin: number;
  radiusMax: number;
  arcMin: number;
  arcMax: number;
  arcRand: number;
  speed: number;
  rotationRand: number;
  curlRand: number;
  curlStrength: number;
  chaosAmp: number;
  thickness: number;
  thicknessPeak: number;
  pointScale: number;
}

export type NoiseType = 'mx' | 'curl';

export interface ISettings {
  kind: 'sprite' | 'instancedMesh';
  instanceScale: number;
  rotation: boolean;
  distortion: boolean;
  noiseType: NoiseType;
  mxOctaves: number;
  blendingMode: 'AdditiveBlending' | 'NormalBlending';
  instances: IInstance[];
}

export type TOptionalSettings = {
  kind?: ISettings['kind'];
  instanceScale?: ISettings['instanceScale'];
  rotation?: ISettings['rotation'];
  distortion?: ISettings['distortion'];
  noiseType?: ISettings['noiseType'];
  mxOctaves?: ISettings['mxOctaves'];
  blendingMode?: ISettings['blendingMode'];
  instances?: Partial<IInstance>[];
};

export interface IProps {
  settings: TOptionalSettings;
}

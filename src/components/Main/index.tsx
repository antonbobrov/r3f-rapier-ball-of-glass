'use client';

import { FC, useState } from 'react';

import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { WebGPURenderer } from 'three/webgpu';

import { DeviceOrientationButton } from '../DeviceOrientationButton';

import { Scene } from './Scene';
import styles from './styles.module.css';
import { WebGPUPostProcessing } from './WebGPUPostProcessing';

export const Main: FC = () => {
  const [frameloop, setFrameloop] = useState<'never' | 'always'>('never');

  return (
    <div className={styles.scene}>
      <DeviceOrientationButton />

      <Canvas
        dpr={[0.8, 3]}
        gl={async ({ canvas }) => {
          const renderer = new WebGPURenderer({
            canvas: canvas as any,
            alpha: true,
            antialias: false,
          });

          renderer
            .init()
            .then(() => setFrameloop('always'))
            .catch(null);

          return renderer;
        }}
        camera={{ fov: 60 }}
        frameloop={frameloop}
      >
        <Stats />

        <WebGPUPostProcessing />

        <Scene />
      </Canvas>
    </div>
  );
};

import { FC, useRef } from 'react';

import { DoubleSide, Group } from 'three';

import { useCopyParentPosition } from '@/hooks/useCopyParentPosition';

import { Particles } from '../Particles';

import { useSphereVisibility } from './hooks/useSphereVisibility';
import { settings } from './settings';
import { IProps } from './types';

export const Sphere: FC<IProps> = ({ pointerRef, isVisible, scale }) => {
  const groupRef = useRef<Group>(null);

  useCopyParentPosition(groupRef, pointerRef);

  useSphereVisibility({ groupRef, isVisible });

  return (
    <group ref={groupRef}>
      <group scale={scale}>
        <mesh>
          <dodecahedronGeometry args={[1, 0]} />

          <meshPhysicalMaterial
            color={0xeeefff}
            emissive={0x000012}
            reflectivity={0.2}
            roughness={0.05}
            metalness={0.0}
            opacity={1}
            transparent
            depthTest={false}
            transmission={1}
            thickness={5.5}
            ior={1.125}
            dispersion={1}
            side={DoubleSide}
          />
        </mesh>

        <group scale={0.5}>
          <Particles settings={settings} />
        </group>
      </group>
    </group>
  );
};

import { FC, useRef } from 'react';

import { Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Group, Vector3 } from 'three';

import { useAnimatableVec3 } from '@/hooks/useAnimatableVec3';
import { useDeviceOrientationDelta } from '@/hooks/useDeviceOrientationDelta';
import { useMouseMoveDelta } from '@/hooks/useMouseMoveDelta';

import { Model } from './Model';
import { Pointer } from './Pointer';

const parallax = 2;
const rotation = Math.PI * 0.6;

export const Scene: FC = () => {
  const groupRef = useRef<Group>(null);

  const { setTarget: setPositionTarget } = useAnimatableVec3(
    ({ x, y }) => {
      const group = groupRef.current!;

      group.position.set(x * parallax, -y * parallax, 0);
    },
    0.02,
    0.1,
  );

  const { setTarget: setRotationTarget } = useAnimatableVec3(
    ({ x, y, z }) => {
      const group = groupRef.current!;

      group.rotation.set(y * rotation, x * rotation, z * rotation);
    },
    0.02,
    0.1,
  );

  useMouseMoveDelta(({ x, y }) => {
    const vec = new Vector3(x, y, 0);

    setPositionTarget(vec);
    setRotationTarget(vec);
  });

  useDeviceOrientationDelta(({ gamma, beta }) => {
    const rotationStrength = 0.05;
    const rotationVector = new Vector3(
      gamma * rotationStrength,
      beta * rotationStrength,
      0,
    );

    const positionStrength = 0.075;
    const positionVector = new Vector3(
      gamma * positionStrength,
      beta * positionStrength,
      0,
    );

    setRotationTarget(rotationVector);
    setPositionTarget(positionVector);
  });

  return (
    <>
      <Environment files="env/warehouse.hdr" environmentIntensity={1} />

      <Physics gravity={[0, 0, 0]} colliders="hull">
        <group ref={groupRef} scale={1}>
          <Pointer />

          <Model />
        </group>
      </Physics>
    </>
  );
};

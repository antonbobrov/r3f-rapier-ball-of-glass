import { FC, useRef } from 'react';

import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';

import { useAnimatableVec3 } from '@/hooks/useAnimatableVec3';
import { useDeviceOrientationDelta } from '@/hooks/useDeviceOrientationDelta';
import { useMouseMoveDelta } from '@/hooks/useMouseMoveDelta';
import { useScreenPositionDelta } from '@/hooks/useScreenPositionDelta';

import { IProps } from './types';

const parallax = 1.5;

export const Pointer: FC<IProps> = ({ ref }) => {
  const bodyRef = useRef<RapierRigidBody>(null);

  const { iterateTarget } = useAnimatableVec3(({ x, y }) => {
    bodyRef.current?.setNextKinematicTranslation(
      new Vector3(x * parallax, -y * parallax, 0),
    );
  });

  useMouseMoveDelta(({ x, y }) => iterateTarget(new Vector3(x, y, 0)));

  useDeviceOrientationDelta(({ gamma, beta }) => {
    const strength = 0.05;

    iterateTarget(new Vector3(gamma * strength, beta * strength, 0));
  });

  useScreenPositionDelta(({ x, y }) => {
    const strength = 3;
    const vec = new Vector3(-x * strength, -y * strength, 0);

    iterateTarget(vec);
  });

  return (
    <RigidBody ref={bodyRef} type="kinematicPosition">
      <group ref={ref} scale={0.75}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />

          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </RigidBody>
  );
};

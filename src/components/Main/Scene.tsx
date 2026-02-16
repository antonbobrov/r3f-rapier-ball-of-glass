import { FC, useEffect, useRef, useState } from 'react';

import { Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Group, Mesh, Vector3 } from 'three';
import { addEventListener } from 'vevet';

import { useAnimatableVec3 } from '@/hooks/useAnimatableVec3';
import { useDeviceOrientationDelta } from '@/hooks/useDeviceOrientationDelta';
import { useMouseMoveDelta } from '@/hooks/useMouseMoveDelta';
import { useScreenPositionDelta } from '@/hooks/useScreenPositionDelta';

import { useRotationOnState } from './hooks/useRotationOnState';
import { Model } from './Model';
import { Pointer } from './Pointer';
import { Sphere } from './Sphere';

const rotation = Math.PI * 0.6;

export const Scene: FC = () => {
  const rotationGroupRef = useRef<Group>(null);
  const positionGroupRef = useRef<Group>(null);
  const pointerRef = useRef<Mesh>(null);

  const [isSphere, setIsSphere] = useState(false);

  useEffect(() => {
    const listener = addEventListener(window, 'click', () => {
      setIsSphere((val) => !val);
    });

    return () => listener();
  }, []);

  const { iterateTarget: iteratePositionTarget } = useAnimatableVec3(
    ({ x, y }) => {
      const group = positionGroupRef.current!;

      group.position.set(x, -y, 0);
    },
    0.02,
    0.1,
  );

  const { iterateTarget: iterateRotationTarget } = useAnimatableVec3(
    ({ x, y, z }) => {
      const group = positionGroupRef.current!;

      group.rotation.set(y * rotation, x * rotation, z * rotation);
    },
    0.02,
    0.1,
  );

  useMouseMoveDelta(({ x, y }) => {
    const vec = new Vector3(x, y, 0);

    iteratePositionTarget(vec);
    iterateRotationTarget(vec);
  });

  useScreenPositionDelta(({ x, y }) => {
    const strength = 5;
    const vec = new Vector3(-x * strength, -y * strength, 0);

    iteratePositionTarget(vec);
    iterateRotationTarget(vec);
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

    iterateRotationTarget(rotationVector);
    iteratePositionTarget(positionVector);
  });

  useRotationOnState(rotationGroupRef, isSphere);

  return (
    <>
      <Environment files="env/warehouse.hdr" environmentIntensity={1} />

      <group ref={rotationGroupRef}>
        <Physics gravity={[0, 0, 0]} colliders="hull">
          <group ref={positionGroupRef} scale={1}>
            <Pointer ref={pointerRef} />

            <Model pointerRef={pointerRef} isVisible={!isSphere} />

            <Sphere pointerRef={pointerRef} isVisible={isSphere} scale={1} />
          </group>
        </Physics>
      </group>
    </>
  );
};

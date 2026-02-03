import { FC, PropsWithChildren, useMemo, useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';

export const ModelRigidBody: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<RapierRigidBody>(null);

  const vec = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const body = ref.current;

    body?.applyImpulse(
      vec.copy(body.translation()).negate().multiplyScalar(0.02),
      true,
    );
  });

  return (
    <RigidBody
      ref={ref}
      lockRotations
      linearDamping={1}
      angularDamping={1}
      friction={1}
      restitution={0.5}
    >
      {children}
    </RigidBody>
  );
};

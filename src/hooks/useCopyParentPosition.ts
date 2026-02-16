import { RefObject } from 'react';

import { useFrame } from '@react-three/fiber';
import { Object3D } from 'three';

export function useCopyParentPosition(
  object: RefObject<Object3D | null>,
  target: RefObject<Object3D | null>,
) {
  useFrame(() => {
    if (object.current && target.current?.parent) {
      object.current.position.copy(target.current.parent.position);
    }
  });
}
